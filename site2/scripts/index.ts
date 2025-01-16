console.log("Secret sauce loaded.");

//----------------------------------------------------------------------------------------
// When the user scrolls down, we want to cancel our animation delays. CSS will handle
// .scrolled globally.
const initialScrollListener = () => {
   if (window.scrollY > 100) {
      console.log("Caught first scroll!");
      window.removeEventListener('scroll', initialScrollListener);

      document.body.classList.add("scrolled");
   }
};

//----------------------------------------------------------------------------------------
function delay(ms: number) {
   return new Promise(r => {setTimeout(r, ms);});
}

//----------------------------------------------------------------------------------------
// Nav button fade animations.
async function fadeAnimations() {
   await delay(3000); // Initial delay.
   const buttons = document.querySelectorAll('.navbutton');
   for (const button of buttons) {
      // Will this be in order?
      button.classList.add('fade-in');
      await delay(150);
   }

   document.querySelector(".main-content-box")?.classList.add('fade-in');
}

//----------------------------------------------------------------------------------------
function cipher(text: string, offset: number, addper: number) {
   let result = "";
   let z = 0;
   for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(((text.charCodeAt(i) - 32 - offset + 95 + z) % 95) + 32);
      z += addper;
   }
   return result;
}

//----------------------------------------------------------------------------------------
function showContactDetails() {
   // Contact details are ciphered until the page renders, so as to avoid spam bots.
   for (const elem of document.getElementsByClassName("my-email")) {
      (elem as HTMLDivElement).innerText = cipher(`^W3ajalf][)_lk`, -15, -1);
   }

   for (const elem of document.getElementsByClassName("my-phone")) {
      (elem as HTMLDivElement).innerText = cipher(`'"$!),*%.-04`, -15, -1);
   }
}

window.addEventListener('scroll', initialScrollListener);
setTimeout(initialScrollListener, 50);
fadeAnimations();
showContactDetails();
