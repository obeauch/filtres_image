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
    apply_filter(ctx, duotone, {r:64, g:29, b:11}, {r:114, g:242, b:219})

    
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


        /**
         *  trouver la différence (en positif) entre les pixels r,g,b de la couleur foncé 
            par rapport à la couleur pâle.
         */
        differ_r = Math.sqrt((color_dark.r - color_light.r) * (color_dark.r - color_light.r))
        differ_g = Math.sqrt((color_dark.g - color_light.g) * (color_dark.g - color_light.g))
        differ_b = Math.sqrt((color_dark.b - color_light.b) * (color_dark.b - color_light.b))


        /**
         * séparer la différence (differ_) en 256
         */
        let dR = differ_r/256
        let dG = differ_g/256
        let dB = differ_b/256

        let tab_couleur_r = []
        let tab_couleur_g = []
        let tab_couleur_b = []

        /**
         * Différence que j'additionne ou soustrait au canal rouge de ma couleur 1 ce qui me donne 254 teintes entre la couleur 1 et la couleur 2.
         * Sima 
         */
        function coul_r(){
            
            if(color_dark.r < color_light.r){
                for(let i = color_dark.r; i<=color_light.r;i+=dR){
                    Math.floor(color_dark.r + dR)
                    tab_couleur_r.push(i)
                } 
            }else if(color_dark.r > color_light.r) {
                for(let i = color_dark.r; i>=color_light.r;i-=dR){
                    Math.ceil(color_dark.r - dR)
                    tab_couleur_r.push(i)
                } 
            }
            return tab_couleur_r[pixel.r]
        }
        
        /**
         * Même chose pour le canal vert
         */
        function coul_g() {
            
            if(color_dark.g < color_light.g){
                for(let j = color_dark.g; j<=color_light.g;j+=dG){
                    Math.floor(color_dark.g + dG)
                    tab_couleur_g.push(j)
                } 
            }else if (color_dark.g > color_light.g){
                for(let j = color_dark.g; j>=color_light.g; j-=dG){
                    Math.ceil(color_dark.g - dG)
                    tab_couleur_g.push(j)
                } 
            }
            return tab_couleur_g[pixel.g]
        }

        /**
         * Même chose pour le canal bleu
         */
        function coul_b() {
            
            if(color_dark.b < color_light.b){
                for(let k = color_dark.b; k<=color_light.b; k+=dB){
                    Math.floor(color_dark.b + dB)
                    tab_couleur_b.push(k)
                } 
            }else if(color_dark.b > color_light.b) {
                for(let k = color_dark.b; k>=color_light.b;k-=dB){
                    Math.ceil(color_dark.b - dB)
                    tab_couleur_b.push(k)
                } 
            }
            return tab_couleur_b[pixel.b]
        }

        /**
         * J'applique au pixel la nouvelle couleur foncé (ou couleur 1).
         */
        pixel.r = coul_r(color_dark.r)
        pixel.g = coul_g(color_dark.g)
        pixel.b = coul_b(color_dark.b)
    
 
        return {
            r: pixel.r,
            g: pixel.g,
            b: pixel.b,
            a: pixel.a,

        }
    }

})