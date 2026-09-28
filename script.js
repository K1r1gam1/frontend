document.addEventListener('DOMContentLoaded', () => {
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
});