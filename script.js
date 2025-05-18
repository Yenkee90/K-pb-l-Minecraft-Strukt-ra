document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const feedbackArea = document.getElementById('feedbackArea');

    analyzeButton.addEventListener('click', () => {
        const command = commandInput.value;
        feedbackArea.textContent = `Elemzésre vár: ${command}`;
    });
});
