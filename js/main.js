window.addEventListener("load", () => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    const img = document.querySelector("img")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    ctx.drawImage(img, 0, 0, canvas.width, img.height/img.width*canvas.width)
    
    //apply_filter(ctx, invert)
    //apply_filter(ctx, luminance)
    apply_filter(ctx, contrast, 2)
    // apply_filter(ctx, duotone, {r:34, g:69, b:117}, {r:214, g:42, b:19})

    
    // L'inverse d'une couleur est égal 
    // à 255 - la valeur actuelle pour chaque chiffre r,g,b 
    function invert(pixel) {

        pixel.r = 255-pixel.r
        pixel.g = 255-pixel.g
        pixel.b = 255-pixel.b
        pixel.a = pixel.a

        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,
         
        }
    }

    
    function luminance(pixel) {
       let lumi = 0.299*pixel.r + 0.587*pixel.g + 0.114*pixel.b

        pixel.r = lumi
        pixel.g = lumi
        pixel.b = lumi
        pixel.a = pixel.a


        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,
            
        }
    }

    function contrast(pixel, level, brightness = 0) {

        level = 80
        brightness = 2.35

        pixel.r = (pixel.r - level) * brightness
        pixel.g = (pixel.g - level) * brightness
        pixel.b = (pixel.b - level) * brightness
        pixel.a = pixel.a

        
        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,

        }
    }


        


    function duotone(pixel, color_dark, color_light) {
        
    }

})

        // console.log(pixel.b)
        // throw new Error("Stop")