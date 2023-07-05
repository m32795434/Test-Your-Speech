import bootstrap from 'bootstrap/dist/js/bootstrap';

class ToastService {
  static showErrorToast(message) {
    const toast = document.querySelector('#toastContainer');
    toast.innerHTML = `
        <div class="toast-body bg-danger text-light" data-bs-delay="3000" 
        role="alert" aria-live="assertive" aria-atomic="true">
          ${message}
        </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }

  static showSuccessToast(message) {
    const toast = document.querySelector('#toastContainer');
    toast.innerHTML = `
        <div class="toast-body bg-success text-light" data-bs-delay="3000" 
        role="alert" aria-live="assertive" aria-atomic="true">
          ${message}
        </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }
}

export default ToastService;
