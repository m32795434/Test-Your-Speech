import bootstrap from 'bootstrap/dist/js/bootstrap';

class ToastService {
  static showErrorToast(message) {
    const toast = document.querySelector('#toastContainerErr');
    toast.innerHTML = `
        <div class="toast-body" 
        role="alert" aria-live="assertive" aria-atomic="true">
          ${message}
        </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }

  static showSuccessToast(message) {
    const toast = document.querySelector('#toastContainerSucc');
    toast.innerHTML = `
        <div class="toast-body" 
        role="alert" aria-live="assertive" aria-atomic="true">
          ${message}
        </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }
}

export default ToastService;
