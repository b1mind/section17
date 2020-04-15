const button = document.querySelector('button');
const output = document.querySelector('p');

const getPos = (opts) => {
  const promise = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(success => { res(success)}, error => { rej(error) }, opts => {})
  })
  return promise
}

const setTimer = (dur) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res(`Done in ${dur}ms`)
    },dur)
  })
  return promise
}

//study function for getPos promise
function trackUserHandler() {
  let positionData
  getPos()
    .then(posData => {
      positionData = posData
      return setTimer(3000)
    })
    .catch(err => {
      console.log(err)
      positionData = `No user location`
    })
    .then(data => {
      lat = positionData.coords.latitude
      long = positionData.coords.longitude
      loc = `Location: lat: ${lat} - long: ${long}`
      console.log(data, loc, positionData)
    })
    .finally(() => {
      // the promise is settled now - finally() will NOT return a new promise!
      // you can do final cleanup work here
      console.log(`Complete finally`)
    })
  setTimer(3000).then(() => {
    console.log(`(Simulated time)`)
  })
  console.log(`getting location.....stand by`)
}

// Async makes function a promise, await acts like a .then inside that promise.
async function trackUserAsync() {
  console.log(`getting location.... again`)
  let posData
  let timerData
  try {
    posData = await getPos()
    timerData = await setTimer(5000)
  } catch (err) {
    console.log(err)
  }
  console.log(timerData, posData)
  console.log(`Simulated time complete`)
}

// study function for promise 
// function trackUserHandler() {
//   console.log('Clicked!');
//   navigator.geolocation.getCurrentPosition(
//     posData => {
//       setTimer(2000).then(data => {
//         console.log(data, posData)
//       })
//   }, error => {
//       console.log(`error`)
//   })
//   setTimer(3000).then(() => {
//     console.log(`timer done!`)
//   })
//   console.log(`getting location.....stand by`)
// }

button.addEventListener('click', () => {
  trackUserAsync()
  trackUserHandler()
});


console.dir(button)