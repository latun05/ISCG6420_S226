// SIDEBAR AD
(function() {
    const ad = document.getElementById('sidebar-ad');
    const bg = document.getElementById('sidebar-bg');
    const title = document.getElementById('sidebar-title');
    const sub = document.getElementById('sidebar-sub');
    const student = document.getElementById('sidebar-student');

    function resetAd() {
        bg.style.transition = 'none';
        bg.style.transform = 'scale(1)';
        bg.style.opacity = '0.3';
        title.style.transition = 'none';
        title.style.transform = 'translateX(-100px)';
        title.style.opacity = '0';
        sub.style.transition = 'none';
        sub.style.transform = 'translateX(100px)';
        sub.style.opacity = '0';
        student.style.transition = 'none';
        student.style.opacity = '0';
    }

    function animateAd() {
        resetAd();
        void ad.offsetWidth; 

        setTimeout(() => {
            bg.style.transition = 'all 0.8s ease';
            bg.style.opacity = '1';
            bg.style.transform = 'scale(1.1)';
        }, 100);

        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.transform = 'translateX(0)';
            title.style.opacity = '1';
        }, 500);

        setTimeout(() => {
            sub.style.transition = 'all 0.6s ease';
            sub.style.transform = 'translateX(0)';
            sub.style.opacity = '1';
        }, 900);

        setTimeout(() => {
            student.style.transition = 'all 0.5s ease';
            student.style.opacity = '1';
        }, 1400);
    }

    window.addEventListener('load', animateAd);

    document.getElementById('replay-btn').addEventListener('click', function() {
        animateAd();
    });
})();

// REGISTRATION
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    nextBtn.addEventListener('click', function() {
    });
});