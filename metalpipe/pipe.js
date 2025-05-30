const sounds = {
    metal: {
      audios: new Array(50).fill(undefined).map(() => new Audio('metalpipe2.mp3')),
      idx: 0
    },
  }
  
  async function playSound (type) {
    if (!(type in sounds)) {
      console.warn(`Attempted to play unknown sound: ${type}`)
    }
  
    const { audios, idx } = sounds[type]
  
    const pipe = audios[idx]
    sounds[type].idx = idx === audios.length - 1 ? 0 : idx + 1
    if (!pipe.paused) {
      pipe.pause()
      pipe.fastSeek(0)
    }
    await pipe.play()
  }

  async function timer() {
    var min = 1;
    var max = 600;

    var rand = Math.floor(Math.random() * (max - min + 1) + min);

    await playSound('metal');
    console.log("Random Time: " + rand);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), rand * 1000)
    })

    let result = await promise;
    await timer()
  }

  async function keep_alive() {
      setInterval( () => {
          console.log("stayin alive!");
      }, 20000);
  }

  let is_running = false;
  
  browser.runtime.onStartup.addListener(async () => {
    if(!is_running) {
        is_running = true;
        keep_alive();
        await timer();
    }
    
  })

  browser.runtime.onInstalled.addListener(async () => {
    if(!is_running) {
        is_running = true;
        keep_alive();
        await timer();
    }
  })
