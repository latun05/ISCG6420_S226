function adReplay() {

    // 1. Get a reference to the ad wrapper
    let ad = document.getElementById("adWrapper");

    // 2. Make a deep copy of it (true = include all children)
    let copy = ad.cloneNode(true);

    // 3. Replace the original with the copy
    ad.replaceWith(copy);
}