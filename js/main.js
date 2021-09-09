window.addEventListener("load", () => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    const img = document.querySelector("img")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    ctx.drawImage(img, 0, 0, canvas.width, img.height/img.width*canvas.width)
    
    //apply_filter(ctx, invert)
    //apply_filter(ctx, luminance)
    //apply_filter(ctx, contrast, 2)
    apply_filter(ctx, duotone, {r:34, g:69, b:117}, {r:214, g:42, b:19})

    
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

        // console.log(lumi)
        // throw new Error("Stop")
 
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

    function contrast(pixel, level, brightness) {

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

        //c1 * (1 - luminance) + c2 * luminance
        
        
        let lumi = 0.299*pixel.r + 0.587*pixel.g + 0.114*pixel.b

        pixel.r = lumi
        pixel.g = lumi
        pixel.b = lumi
        
        let r1 = (color_dark.r*(1-0.299)+(pixel.r*0.299))
        let g1 = (color_dark.g*(1-0.587)+(pixel.g*0.587))
        let b1 = (color_dark.b*(1-0.114)+(pixel.b*0.114))

        let r2 = (color_light.r*(1-0.299)+(pixel.r*0.299))
        let g2 = (color_light.g*(1-0.587)+(pixel.g*0.587))
        let b2 = (color_light.b*(1-0.114)+(pixel.b*0.114))

        // console.log(r1)
        // console.log(g1)
        // console.log(b1)

        // console.log(r2)
        // console.log(g2)
        // console.log(b2)

        // throw new Error("Stop")
        

        if(lumi<128) {
            pixel.r = r1
            pixel.g = g1
            pixel.b = b1
        }
        else if(lumi>128){
            pixel.r = r2
            pixel.g = g2
            pixel.b = b2
        }

        // console.log(pixel.r)
        // throw new Error("Stop")
 
        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,

        }
    }

})

        // console.log(pixel.b)
        // throw new Error("Stop")