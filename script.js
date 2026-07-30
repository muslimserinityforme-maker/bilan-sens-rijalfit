(function () {
  const stepGate = document.getElementById('step-gate');
  const gateContinue = document.getElementById('gate-continue');
  const gateError = document.getElementById('gate-error');

  const form = document.getElementById('bilan-form');
  const submitBtn = document.getElementById('submit-btn');
  const formError = document.getElementById('form-error');
  const loadingState = document.getElementById('loading-state');
  const successState = document.getElementById('success-state');
  const downloadLink = document.getElementById('download-link');
  const energieInput = document.getElementById('energie');
  const energieValue = document.getElementById('energie-value');

  const gateFields = ['prenom', 'nom', 'email', 'telephone', 'consentement'];

  function showGateError(message) {
    gateError.textContent = message;
    gateError.hidden = false;
  }

  function clearGateError() {
    gateError.hidden = true;
    gateError.textContent = '';
  }

  gateContinue.addEventListener('click', function () {
    clearGateError();
    let valid = true;
    gateFields.forEach((name) => {
      const el = document.getElementById(name);
      if (!el.checkValidity()) valid = false;
    });
    if (!valid) {
      gateFields.forEach((name) => document.getElementById(name).reportValidity());
      return;
    }
    stepGate.hidden = true;
    form.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  energieInput.addEventListener('input', () => {
    energieValue.textContent = energieInput.value + ' / 10';
  });

  function showError(message) {
    formError.textContent = message;
    formError.hidden = false;
  }

  function clearError() {
    formError.hidden = true;
    formError.textContent = '';
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    clearError();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const gateData = {};
    gateFields.forEach((name) => {
      const el = document.getElementById(name);
      gateData[name] = el.type === 'checkbox' ? el.checked : el.value;
    });

    const formData = new FormData(form);
    const payload = Object.assign({}, gateData, Object.fromEntries(formData.entries()));

    submitBtn.disabled = true;
    form.hidden = true;
    loadingState.hidden = false;

    try {
      const response = await fetch('/api/generate-bilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Une erreur est survenue. Réessaie dans quelques instants.";
        try {
          const errBody = await response.json();
          if (errBody && errBody.error) message = errBody.error;
        } catch (_) { /* réponse non-JSON, on garde le message par défaut */ }
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = `Bilan-de-Sens-${(payload.prenom || 'rijalfit').toLowerCase()}.pdf`;

      loadingState.hidden = true;
      successState.hidden = false;
    } catch (err) {
      loadingState.hidden = true;
      form.hidden = false;
      submitBtn.disabled = false;
      showError(err.message || "Une erreur est survenue. Réessaie dans quelques instants.");
    }
  });
})();
