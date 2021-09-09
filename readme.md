# Filtres d'image avec Canvas

## Explications et objectif
L'objectif de cet exercice est de reproduire certains effets Photoshop sur une image. L'opération se fera sur chaque pixel un après l'autre.

### Original:
<img src="images/wallhaven-839zjk.jpg" width="400">

### Inversion:
<img src="images/resultats/invert.png" width="400">

### Luminance:
<img src="images/resultats/luminance.png" width="400">

### Contraste:
<img src="images/resultats/contrast.png" width="400">

### Duotone:
<img src="images/resultats/duotone.png" width="400">

## Application de filtres
Pour appliquer un filtre, la fonction `apply_filter(ctx, fonction_filtre)` vous est fournie. Elle s'occupe d'appeler votre `fonction_filtre` pour chacun des pixels de l'image avec en paramètre le rgb du pixel. Cette fonction de filtre doit retourner un objet javascript contenant la nouvelle couleur du pixel sous la forme d'un object avec les index `r`, `g`, `b` et `a`.

Par exemple:
```javascript
function invert(pixel) {
    // pixel.r contient la valeur de rouge du pixel à traité

    // traitement ici

    return {
        r: pixel.r, // retourne la même valeur
        g: pixel.g,
        b: pixel.b,
        a: pixel.a,
    }
}
```

## Ajout de paramètres
Il est aussi possible d'ajouter d'autres paramètres à la fonction `apply_filter`. Ils seront automatiquement transférés à la fonction de filtre.

Par exemple:
```javascript
apply_filter(ctx, ma_fn, 2, 42)

function ma_fn(pixel, param1, param2) {
    // param1 vaut 2
    // param2 vaut 42
}
```

## Debug
Puisque nos fonctions sont appellées une fois par pixels, avoir un console.log risque de crasher votre page. Si vous devez faire un `console.log` pour mieux comprendre votre code, vous pouvez ensuite `return false` et les prochains pixels ne seront pas exécutés.

```javascript
apply_filter(ctx, ma_fn)

function ma_fn(pixel) {
    console.log(pixel)

    return false // Annule la suite!

    return {
        r: pixel.r,
        g: pixel.g,
        b: pixel.b,
        a: pixel.a,
    }
}
```


<style type="text/css">
body { font-size: 22px;}
h1 { font-weight: bold; text-align: center; margin-bottom: 50px; border: none; }
h2 { margin-top: 30px; border-bottom: 1px dotted rgba(255,255,255,0.2); font-weight: bold;}
h3 {font-weight: bold;}
</style>