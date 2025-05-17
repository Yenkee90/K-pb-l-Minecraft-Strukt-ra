function analyzeCode() {
    const input = document.getElementById("commandInput").value.trim();
    const result = document.getElementById("result");

    if (!input.startsWith("/")) {
        result.textContent = "❌ Hiba: A parancs nem kezdődik '/'-jelzéssel!";
        return;
    }

    result.textContent = "✅ A parancs megfelelő!";
}
