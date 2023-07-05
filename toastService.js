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

  static showGreatJob() {
    const toast = document.querySelector('#toastGreatJob');
    toast.innerHTML = `
        <div class="toast-body" 
        role="alert" aria-live="assertive" aria-atomic="true">
          <img src="https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/images%2Fgreat-job-lg.gif?alt=media&token=df86689f-a0bf-4a37-a293-e8ab9712fe0e" alt="Animated Gif" />
        </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }
}

export default ToastService;
