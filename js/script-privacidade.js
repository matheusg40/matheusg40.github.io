const policyBox = document.getElementById('policy-box');
const agreeButton = document.getElementById('agree-button');
const progressBar = document.getElementById('progress-bar');
const message = document.getElementById('message');
const finalMessage = document.createElement('p'); 

finalMessage.id = 'final-message';
finalMessage.innerText = "Finalmente terminamos e agora você faz parte do 0,1% que leem isso! Valeu e tchau!";
document.querySelector('.container').appendChild(finalMessage); 

function updateProgress() {
    const totalHeight = policyBox.scrollHeight - policyBox.clientHeight;
    const currentScroll = policyBox.scrollTop;

    const progress = (currentScroll / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
    if (currentScroll >= totalHeight - 5) {
        agreeButton.disabled = false;
        agreeButton.classList.add('final'); 
        message.style.display = 'block';
    } else {
        agreeButton.disabled = true;
        agreeButton.classList.remove('final');
        message.style.display = 'none';
    }
}
policyBox.addEventListener('scroll', updateProgress);

agreeButton.addEventListener('click', function () {
    finalMessage.style.display = 'block'; 
});
