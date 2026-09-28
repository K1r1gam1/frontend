document.addEventListener('DOMContentLoaded', () => {
    // --- Отправка имени ---
    const sendButton = document.getElementById('sendButton');
    const nameInput = document.getElementById('nameInput');
    const statusMessage = document.getElementById('statusMessage');

    sendButton.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        if (!name) {
            statusMessage.textContent = 'Пожалуйста, введите имя!';
            statusMessage.className = 'status error';
            return;
        }

        statusMessage.textContent = 'Отправка...';
        statusMessage.className = 'status';

        try {
            const response = await fetch('http://127.0.0.1:8000/api/send-name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            const result = await response.json();

            if (result.status === 'success') {
                statusMessage.textContent = result.message;
                statusMessage.className = 'status success';
                nameInput.value = '';
            } else {
                statusMessage.textContent = result.message || 'Произошла ошибка.';
                statusMessage.className = 'status error';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            statusMessage.textContent = 'Не удалось связаться с сервером.';
            statusMessage.className = 'status error';
        }
    });

    // --- Просмотр по дате ---
    const showButton = document.getElementById('showButton');
    const dateInput = document.getElementById('dateInput');
    const usersOutput = document.getElementById('usersOutput');
    const resultTitle = document.getElementById('resultTitle');

    showButton.addEventListener('click', async () => {
        const date = dateInput.value;
        if (!date) {
            usersOutput.value = 'Пожалуйста, выберите дату.';
            resultTitle.style.display = 'none';
            return;
        }

        usersOutput.value = 'Поиск...';
        resultTitle.style.display = 'none';

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/get-users-by-date?date=${date}`);
            const result = await response.json();

            if (result.status === 'success') {
                if (result.names && result.names.length > 0) {
                    usersOutput.value = result.names.join('\n');
                    resultTitle.textContent = `Пользователи за ${date}:`;
                    resultTitle.style.display = 'block';
                } else {
                    usersOutput.value = result.message;
                    resultTitle.style.display = 'none';
                }
            } else {
                usersOutput.value = result.message || 'Ошибка при получении данных.';
                resultTitle.style.display = 'none';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            usersOutput.value = 'Не удалось связаться с сервером.';
            resultTitle.style.display = 'none';
        }
    });
});