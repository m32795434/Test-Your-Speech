import bootstrap from 'bootstrap/dist/js/bootstrap';

class ToastService {
  static showWelcome() {
    const toast = document.querySelector('#welcomeToast');
    toast.innerHTML = `
    <div class="toast-header">
    <strong class="me-auto">Welcome!</strong>
    <small>Close</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    Hello, world! 🌐<br />
    Some considerations: <br />
    - You must use headphones to improve the experience and help the Api to well detecting the audio. <br />
    - Don't forget to allow the microphone recording! <br />
    - <b><<<😕 Mobile version not fully functional yet>>></b>  <br />

    - Have fun!😛
  </div>
      `;
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(toast);
    bootstrapToast.show();
  }

  static showErrorToast(message) {
    const toast = document.querySelector('#errToastContainer');
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
    const toast = document.querySelector('#succToastContainer');
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
    const toast = document.querySelector('#greatJobToast');
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
