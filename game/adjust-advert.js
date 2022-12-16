(function () {
    let _id = setInterval(() => {
        if (document.readyState === 'complete') {
            let _cs = document.getElementsByTagName('center');
            for (let i = 0; i < _cs.length; i++) {
                _cs[i].remove();
            }
            clearInterval(_id);
        }
    }, 10)
})();