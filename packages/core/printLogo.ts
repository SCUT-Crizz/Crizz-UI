

export default function () {
  if (PROD) {
    const logo = `
  __________________________________________________
  
   ______        __                _______  _______ 
  |      |.----.|__|.-----..-----.|   |   ||_     _|
  |   ---||   _||  ||-- __||-- __||   |   | _|   |_ 
  |______||__|  |__||_____||_____||_______||_______|
                                             
  __________________________________________________
                author:Crizz
  `

    const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `

    console.info(`%c${logo}`, rainbowGradient)
  } else if (DEV) {
    console.log('[CrizzUI]:dev mode...')
  }
}
