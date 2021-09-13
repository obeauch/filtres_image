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
        
        
        // convertir en niveaux de gris
        let lumi = Math.round(0.299*pixel.r + 0.587*pixel.g + 0.114*pixel.b)

        let tableau_gris = []

        // Placer les valeurs de gris de chaque pixel (r,v,b) dans un tableau
        for(i=0; i<3; i++){
            tableau_gris.push(lumi)
            pixel.r = tableau_gris[0]
            pixel.g = tableau_gris[1]
            pixel.b = tableau_gris[2]
        }

        // pixel.a = pixel.a
        
        // console.log(pixel.r)
        // console.log(pixel.g)
        // console.log(pixel.b)
        // console.log (tableau_gris)
        // throw new Error("Stop")


        /**
         *  trouver la différence entre les pixels r,g,b de la couleur foncé 
            par rapport à la couleur pâle.
         */
        differ_r = Math.sqrt((color_dark.r - color_light.r) * (color_dark.r - color_light.r))
        differ_g = Math.sqrt((color_dark.g - color_light.g) * (color_dark.g - color_light.g))
        differ_b = Math.sqrt((color_dark.b - color_light.b) * (color_dark.b - color_light.b))


        /**
         * séparer la différence (differ_) en 255 teintes
         */
        let dR = differ_r/255
        let dG = differ_g/255
        let dB = differ_b/255

        let tab_couleur_r = []
        let tab_couleur_g = []
        let tab_couleur_b = []
        

        /**
         * Ajouter ou réduire la teinte de couleur foncé canal rouge (color_dark.r) jusqu'à la couleur pâle canal rouge (color_light.r) pour obtenir 255 teintes entre les 2. 
         */
        for(let i = color_dark.r; i<=color_light.r;i+=dR){
           if(color_dark.r < color_light.r){
               Math.round(color_dark.r + dR)
               tab_couleur_r.push(i)
            //    console.log(tab_couleur_r)
           } else {
                Math.round(color_dark.r - dR)
                tab_couleur_r.push(i)
                // console.log(tab_couleur_r)
           }
        }


        /**
         * Même chose pour le canal vert
         */
        for(let j = color_dark.g; j>=color_light.g;j-=dG){
           if(color_dark.g < color_light.g){
               Math.round(color_dark.g + dG)
               tab_couleur_g.push(j)
            //    console.log(tab_couleur_g)
           } else {
                Math.round(color_dark.g - dG)
                tab_couleur_g.push(j)
                // console.log(tab_couleur_g)
           }
        }

        /**
         * Même chose pour le bleu
         */
        for(let k = color_dark.b; k>=color_light.b;k-=dB){
           if(color_dark.b < color_light.b){
               Math.round(color_dark.b + dB)
               tab_couleur_b.push(k)
            //    console.log(tab_couleur_b)
           } else {
            Math.round(color_dark.b - dB)
            tab_couleur_b.push(k)
            // console.log(tab_couleur_b)
           }
        }

        /**
         * Appliquer au pixel, la couleur du tableau_couleur correspondant au gris du pixel appliqué plus haut
         */
        pixel.r = tab_couleur_r[pixel.r]
        pixel.g = tab_couleur_g[pixel.g]
        pixel.b = tab_couleur_b[pixel.b]
    
        // console.log(differ_r)
        // console.log(differ_g)
        // console.log(differ_b)
        // console.log(tab_couleurs[0])
        // console.log(tab_couleurs[1])
        // console.log(tab_couleurs[2])
        // console.log(pixel.r)
        // console.log(pixel.g)
        // console.log(pixel.b)
        // throw new Error("Stop")

 
        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,

        }
    }

})
