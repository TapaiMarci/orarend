const apiUrl = 'http://localhost:3000/api/tantargy';

async function fetchSchedule() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching error:", error);
    return [];
  }
}

async function deleteScheduleItem(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newScheduleData = await fetchSchedule();
        renderSchedule(newScheduleData);
    } catch (error) {
        console.error("Deleting schedule error:", error);
    }
}

function renderSchedule(data) {
  const tbody = document.querySelector('#schedule-table tbody');
  tbody.innerHTML = '';
  const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  const maxHour = 8;

  for (let hour = 1; hour <= maxHour; hour++) {
    const tr = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = `${hour}. óra`;
    tr.appendChild(th);

    for (let day of days) {
      let td = document.createElement('td');
      const lesson = data.find(item => item.day === day && item.hour === hour);
      if (lesson) {
          td.textContent = lesson.subject;
          td.dataset.id = lesson.id;
          td.addEventListener('click', () => deleteScheduleItem(lesson.id));
      } else {
          td.textContent = '';
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const scheduleData = await fetchSchedule();
  renderSchedule(scheduleData);

  const addForm = document.getElementById('add-form');
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const day = document.getElementById('day').value;
    const hour = document.getElementById('hour').value;
    const subject = document.getElementById('subject').value;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ day, hour, subject }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newScheduleData = await fetchSchedule();
      renderSchedule(newScheduleData);
      addForm.reset();

    } catch (error) {
      console.error("Adding schedule error:", error);
    }
  });
});
