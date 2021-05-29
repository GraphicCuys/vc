# PBR (Physically Based Rendering) 
## Como Obtener Materiales Realistas para Rasterización y Ray Tracing

### -- De donde Nacen los Shaders PBR
En el mundo de las gráficas por computador los algoritmos de renderización basados en ray tracing para iluminación global generan los resultados más fotorrealistas gracias a su simulación de las propiedades físicas de la luz, sin embargo estos son computacionalmente pesados y difíciles de implementar en tiempo real sin el apoyo de hardware gráfico especializado, es por esto que los desarrolladores que trabajan en estos algoritmos tratan de hacer lo posible por optimizar los cálculos requeridos para su implementación sin comprometer el fotorrealismo de la imagen. Por el otro lado existen los algoritmos basados en rasterización que no hacen uso de la iluminación global y están basados en la proyección que los objetos tridimensionales generan en la pantalla, estos pueden producir imágenes en tiempo real ya que no son tan pesados pero su acercamiento al fotorrealismo no es ideal y los desarrolladores que trabajan con estos tratan de aumentar su complejidad para obtener materiales más realistas.


Hoy en día se utilizan una gran cantidad de implementaciones de estos algoritmos en diferentes software como motores de videojuegos, programas de manipulación de gráficos 3D entre otros para producir imágenes generadas por computador, el problema durante mucho tiempo era que cada una de estas implementaciones utilizaban sus propias formas de definir shaders que en muchos casos no eran compatibles entre ellas. Todos estos problemas han llevado a avances en la estandarización de shaders que buscan definir materiales de objetos utilizando como inputs archivos que fueran fácilmente exportables e implementables en diferentes programas (generalmente imágenes), que pudieran ser aplicables tanto en renderizadores que manejen ray tracing, rasterización o combinaciones híbridas de ambas técnicas y que trataran de imitar lo más posible el comportamiento físico de la luz con objetos reales para generar materiales físicos y realistas.


### -- Que es PBR y como se Definen sus Inputs
Teóricamente el Physical en Physically Based Rendering proviene de simular y abstraer computacionalmente el comportamiento físico que la luz describe al interactuar sobre diferentes materiales, los rayos de luz viajan a través del espacio hasta encontrarse con un objeto en su camino, una vez interactúan con el objeto estos rayos pueden ser reflejados o absorbidos por el material dependiendo de su composición. Los rayos absorbidos no contribuyen nada al color del material, sin embargo los rayos reflejados definirán su color y dependiendo de su comportamiento (dirección, rebote, incidencia, ángulo) al ser reflejado por el material presentarán ciertas propiedades que definirán su apariencia ante nuestros ojos.

Aunque algunas definiciones de shaders PBR cambian según su implementación la base teórica de estos se maneja bajo una serie de “canales” que definen las propiedades de un material de una manera realista, lo ideal sería tener un shader por cada material que se va a utilizar pero en la realidad y en la práctica cualquier objeto puede estar conformado por varios materiales y componentes, esto requiere que diferentes propiedades puedan ser descritas y modificadas en el mismo archivo y es por esto que en general todas estas propiedades se definen como texturas mapeadas al objeto para cada uno de los canales que se describen a continuación.


#### ---- Canal de Color - Albedo / Diffuse
Los rayos de luz visible se componen de un espectro de colores y según el tipo de material con el que la luz interactúa algunos de estos colores serán absorbidos mientras que otros serán reflejados en múltiples direcciones, en el objeto esta reflexión se conoce como reflexión difusa y la combinación de colores de los rayos difusos determinan el “color base” del objeto. 

![Diffuse Theory](/docs/sketches/diffuse.png)
Imagen:https://academy.substance3d.com/courses/the-pbr-guide-part-1

Como input para un shader PBR se define este color base o se asigna una textura llamada diffuse o albedo que representa el color del objeto, dependiendo de la implementación esta textura puede contener detalles, sombras e imperfecciones para hacerlo más realista sin embargo es común que esta textura solamente contenga la información de color base. 

![Diffuse Implementation](/docs/sketches/img-diffuse.png)


#### ---- Canal de Rugosidad - Roughness / Specular
Ningún material en la vida real es 100% plano ya que a nivel microscópico existen imperfecciones que afectan la dirección en que la luz es reflejada, entre más plano sea un objeto la luz será absorbida o redireccionada menos creando cada vez más una reflexión exacta de la luz que entra al material en dirección perpendicular a la que entró, en el objeto esta reflexión se conoce como reflexión especular siendo un espejo la máxima expresión de este fenómeno, en el otro extremo materiales con muchas imperfecciones microscópicas tienden a no reflejar la luz en la misma dirección y tienen una presentación mucho menos reflectiva y mucho más opaca. 

![Roughness Theory](/docs/sketches/microfacets.png)
Imagen:https://learnopengl.com/PBR/Theory

El shader PBR utiliza un canal llamado roughness que recibe un valor numérico entre 0 y 1 o una imagen en escala de grises que define este valor para diferentes zonas del material, este representa el nivel de imperfecciones microscópicas o rugosidad y lo presentará como el nivel de reflexión especular que tendrá el objeto.

![Roughness Implementation](/docs/sketches/img-roughness.png)

#### ---- Canal de Metalicidad - Metallicity / Metallness
Los materiales metálicos por su naturaleza conductiva tienden a reflejar rayos de luz completamente haciéndolos extremadamente especulares y en teoría por esto la mayoría de los metales tienden a no tener un color difuso específico, en la realidad propiedades como oxidación, imperfecciones e impurezas hacen que no todos los metales sean espejos perfectos. Los renderizadores PBR toman en cuenta estas propiedades con un canal llamado Metallness o Metalicidad que afecta el color base del objeto reduciendo la reflexión difusa y aumentando la especularidad, al igual que Roughness esta propiedad se mide como un valor de 0 a 1 o una imagen en escala de grises representando diferentes valores de metalicidad mapeados al objeto.
![Diffuse Implementation](/docs/sketches/img-metalness.png)

#### ---- Canal Normal - Normal / Bump / Height
Este canal no está tan relacionado con las propiedades físicas de la luz sino que busca agregar pequeños detalles a la presentación de un objeto sin la necesidad de agregarlos a la malla, esto se hace para reducir la complejidad y el número de polígonos en los objetos 3D de manera que su renderización sea más óptima. Existen muchas maneras de representar estos detalles en PBR con una combinación de diferentes texturas como el Bump Map o Height Map a escala de grises que presenta las diferentes alturas de los detalles, también existe el Normal Map que representa la información de detalles con mayor precisión utilizando valores de RGB para codificar la posición de los detalles en XYZ afectando las normales en el cálculo de iluminación durante el render.
![Diffuse Implementation](/docs/sketches/img-normal.png)

#### ---- Canal de Oclusión Ambiental - AO
Finalmente el canal de Oclusión Ambiental solo se puede representar como una textura a escala de grises que define zonas en el objeto donde la luz alcanza menos y por tanto tendrán menor iluminación, esto nos permite agregar o aumentar la visibilidad de ciertos detalles que no se representan muy bien en el renderizado, de la misma manera este sirve para optimizar el proceso de renderizado al evitar realizar cálculos de oclusión ambiental por parte del renderizador.

> :ToCPrevNext