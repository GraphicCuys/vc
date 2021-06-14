# PBR (Physically Based Rendering) - Como Obtener Materiales Realistas para Rasterización y Ray Tracing

## De donde Nacen los Shaders PBR
En el mundo de las gráficas por computador los algoritmos de renderización basados en ray tracing para iluminación global generan los resultados más fotorrealistas gracias a su simulación de las propiedades físicas de la luz, sin embargo estos son computacionalmente pesados y difíciles de implementar en tiempo real sin el apoyo de hardware gráfico especializado, es por esto que los desarrolladores que trabajan en estos algoritmos tratan de hacer lo posible por optimizar los cálculos requeridos para su implementación sin comprometer el fotorrealismo de la imagen. Por el otro lado existen los algoritmos basados en rasterización que no hacen uso de la iluminación global y están basados en la proyección que los objetos tridimensionales generan en la pantalla, estos pueden producir imágenes en tiempo real ya que no son tan pesados pero su acercamiento al fotorrealismo no es ideal y los desarrolladores que trabajan con estos tratan de aumentar su complejidad para obtener materiales más realistas.


Hoy en día se utilizan una gran cantidad de implementaciones de estos algoritmos en diferentes software como motores de videojuegos, programas de manipulación de gráficos 3D entre otros para producir imágenes generadas por computador, el problema durante mucho tiempo era que cada una de estas implementaciones utilizaban sus propias formas de definir shaders que en muchos casos no eran compatibles entre ellas. Todos estos problemas han llevado a avances en la estandarización de shaders que buscan definir materiales de objetos utilizando como inputs archivos que fueran fácilmente exportables e implementables en diferentes programas (generalmente imágenes), que pudieran ser aplicables tanto en renderizadores que manejen ray tracing, rasterización o combinaciones híbridas de ambas técnicas y que trataran de imitar lo más posible el comportamiento físico de la luz con objetos reales para generar materiales físicos y realistas.


## Que es PBR y como se Definen sus Inputs
Teóricamente el Physical en Physically Based Rendering proviene de simular y abstraer computacionalmente el comportamiento físico que la luz describe al interactuar sobre diferentes materiales, los rayos de luz viajan a través del espacio hasta encontrarse con un objeto en su camino, una vez interactúan con el objeto estos rayos pueden ser reflejados o absorbidos por el material dependiendo de su composición. Los rayos absorbidos no contribuyen nada al color del material, sin embargo los rayos reflejados definirán su color y dependiendo de su comportamiento (dirección, rebote, incidencia, ángulo) al ser reflejado por el material presentarán ciertas propiedades que definirán su apariencia ante nuestros ojos.

Aunque algunas definiciones de shaders PBR cambian según su implementación la base teórica de estos se maneja bajo una serie de “canales” que definen las propiedades de un material de una manera realista, lo ideal sería tener un shader por cada material que se va a utilizar pero en la realidad y en la práctica cualquier objeto puede estar conformado por varios materiales y componentes, esto requiere que diferentes propiedades puedan ser descritas y modificadas en el mismo archivo y es por esto que en general todas estas propiedades se definen como texturas mapeadas al objeto para cada uno de los canales que se describen a continuación.


- ### Canal de Color - Albedo / Diffuse
Los rayos de luz visible se componen de un espectro de colores y según el tipo de material con el que la luz interactúa algunos de estos colores serán absorbidos mientras que otros serán reflejados en múltiples direcciones, en el objeto esta reflexión se conoce como reflexión difusa y la combinación de colores de los rayos difusos determinan el “color base” del objeto. 
![Diffuse Theory](/docs/sketches/diffuse.png)
Imagen__>:https://academy.substance3d.com/courses/the-pbr-guide-part-1

	Como input para un shader PBR se define este color base o se asigna una textura llamada diffuse o albedo que representa el color del objeto, dependiendo de la implementación esta textura puede contener detalles, sombras e imperfecciones para hacerlo más realista sin embargo es común que esta textura solamente contenga la información de color base. 

	![Diffuse Implementation](/docs/sketches/img-diffuse.png)


- ### Canal de Rugosidad - Roughness / Specular
Ningún material en la vida real es 100% plano ya que a nivel microscópico existen imperfecciones que afectan la dirección en que la luz es reflejada, entre más plano sea un objeto la luz será absorbida o redireccionada menos creando cada vez más una reflexión exacta de la luz que entra al material en dirección perpendicular a la que entró, en el objeto esta reflexión se conoce como reflexión especular siendo un espejo la máxima expresión de este fenómeno, en el otro extremo materiales con muchas imperfecciones microscópicas tienden a no reflejar la luz en la misma dirección y tienen una presentación mucho menos reflectiva y mucho más opaca. 
![Roughness Theory](/docs/sketches/microfacets.png)
Imagen__>:https://learnopengl.com/PBR/Theory

	El shader PBR utiliza un canal llamado roughness que recibe un valor numérico entre 0 y 1 o una imagen en escala de grises que define este valor para diferentes zonas del material, este representa el nivel de imperfecciones microscópicas o rugosidad y lo presentará como el nivel de reflexión especular que tendrá el objeto.

	![Roughness Implementation](/docs/sketches/img-roughness.png)

- #### Canal de Metalicidad - Metallicity / Metallness
Los materiales metálicos por su naturaleza conductiva tienden a reflejar rayos de luz completamente haciéndolos extremadamente especulares y en teoría por esto la mayoría de los metales tienden a no tener un color difuso específico, en la realidad propiedades como oxidación, imperfecciones e impurezas hacen que no todos los metales sean espejos perfectos. Los renderizadores PBR toman en cuenta estas propiedades con un canal llamado Metallness o Metalicidad que afecta el color base del objeto reduciendo la reflexión difusa y aumentando la especularidad, al igual que Roughness esta propiedad se mide como un valor de 0 a 1 o una imagen en escala de grises representando diferentes valores de metalicidad mapeados al objeto.
![Diffuse Implementation](/docs/sketches/img-metalness.png)

- ### Canal Normal - Normal / Bump / Height
Este canal no está tan relacionado con las propiedades físicas de la luz sino que busca agregar pequeños detalles a la presentación de un objeto sin la necesidad de agregarlos a la malla, esto se hace para reducir la complejidad y el número de polígonos en los objetos 3D de manera que su renderización sea más óptima. La forma mas comun de representar ests detalles a a traves de un Normal Map el cual es una textura que utiliza valores RGB para codificar la posición de los detalles en XYZ afectando las normales en el cálculo de iluminación durante el render.
![Normal Theory](/docs/sketches/normal.png)
Imagen__>:https://learnopengl.com/Advanced-Lighting/Normal-Mapping
![Diffuse Implementation](/docs/sketches/img-normal.png)

- ### Canal de Oclusión Ambiental - AO
Finalmente el canal de Oclusión Ambiental solo se puede representar como una textura a escala de grises que define zonas en el objeto donde la luz alcanza menos y por tanto tendrán menor iluminación, esto nos permite agregar o aumentar la visibilidad de ciertos detalles que no se representan muy bien en el renderizado, de la misma manera este sirve para optimizar el proceso de renderizado al evitar realizar cálculos de oclusión ambiental por parte del renderizador.


## Cómo se procesa esta información
Inicialmente una implementación PBR debe seguir una serie de principios para procesar la información de los materiales que se presentan con los inputs de los canales mencionados anteriormente:

- ### Conservación de la Energía
La energía no se crea ni se destruye, solo se transforma. Este principio de la física es primordial para el procesamiento de nuestros shaders ya que una vez un rayo de luz interactúa con un material este se debe dividir en una parte que es refractada como rayos difusos y una parte que es reflejada como rayos especulares, esto quiere decir que entre mayor especularidad, menor difusión del color base del material. 
![Energy Conservation](/docs/sketches/energy.png)
Imagen__>:https://learnopengl.com/PBR/Theory

- ### Aplicación del BRDF - Bidirectional Reflectance Distribution Function
El BRDF es una función que actúa en el proceso de renderización, esta función toma como input el vector dirección del rayo de luz entrante Wi, el vector dirección de la vista de salida Wo (la cámara de la escena), la normal de la superficie a renderizar N y un parámetro A que se calcula con los inputs de los canales que definimos anteriormente, con esta información y siguiendo las ley de conservación de la energía el BRDF calcula la cantidad de influencia que cada rayo tiene sobre la reflexión difusa y la reflexión especular del material que generan el color de su imagen vista desde la cámara.
![BRDF](/docs/sketches/BRDF.png)
Imagen__>:https://learnopengl.com/PBR/Theory

	Existen varios modelos para implementar esta función como el modelo Lambertiano, el modelo de Bling-Phong y el modelo de Cook-Torrance, cada una de estos puede recibir más o menos parámetros obteniendo resultados diferentes y su implementación se puede hacer con diferentes ecuaciones y funciones que pueden aumentar detalles como Fresnel de las reflexiones, Oclusión Ambiental y varios cálculos extras que generan un imagen más realista pero aumentan la complejidad y el tiempo total de los cálculos a realizar.

## Aplicaciones y trucos de PBR para obtener realismo con Rasterización
Aplicar un modelo PBR a un renderizador que utiliza Ray Tracing puede parecer intuitivo ya que la intención del PBR de modelar materiales utilizando una abstracción de sus propiedades físicas puede acoplarse muy bien a un sistema que busca modelar la luz simulando fotones, de esta manera el output del BRDF sobre la reflexión especular puede utilizarse para calcular la cantidad de iluminación indirecta ambiental que se debe utilizar en un Shader y cuyo valor exacto puede calcularse rebotando los rayos de luz en la dirección correcta, sin embargo este mismo sistema no se puede acoplar muy bien a un rasterizador que no puede calcular la iluminación global y en el cual la reflexión especular no se puede representar correctamente.

Un truco muy utilizado para obtener implementaciones de PBR utilizando un rasterizador es generando una aproximación de luz ambiental utilizando IBL (Image Based Lighting), esta luz basada en imágenes puede hacer uso de panorámicas ambientales de 360° capturadas utilizando HDRI, tambien se puede realiar un pre-render 360° de la escena para obtener incluso mas detalles de iluminacion global.

- ### 360° HDRIs
Este tipo de imágenes son tomadas utilizando una técnica especial que permite obtener imágenes con un rango dinámico alto lo cual les permite una mayor información sobre colores, contraste y mucho más importante para nosotros iluminacion.
![HDRI](/docs/sketches/venice_sunset.jpg)
Imagen utilizada como fondo en ejemplos de inputs PBR anteriores (estos se realizaron en un renderizador con ray tracing)

	El tipo de imágenes HDRI que utilizamos deben ser capturadas con dispositivos especiales de captura en 360° para poder proyectarse de forma esférica alrededor de nuestra escena de manera que la pueda envolver completamente, la IBL con HDRIs es una técnica de iluminación muy utilizada también en renderizadores con ray tracing ya que nos permite obtener una excelente aproximación a luz natural, luz de ambiente y luz indirecta.

- ### 360° Pre-Render Baking
Esta tecnica buscan crear una imagen envolvente similar al HDRI pero de la escena misma que queremos renderizar y desde el punto de vista del objeto lo cual nos permitiria implementar una aproximacion muy cercana a luz indirecta en un rasterizador, sin embargo el proceso de render en 360° para cada objeto a renderizar puede volverse mas costoso computacionalmente que el mismo Ray Tracing por lo que esta opcion no es muy utilizada.

Una vez se obtienen estas imágenes el renderizador les aplicará diferentes máscaras de convolución de tipo blur que generar una imagen conocida como mapa de irradiación a partir de la cual se puede aproximar puntos origen de luz.
![HDRI](/docs/sketches/irradiance.png)
Imagen__>:https://avilapa.github.io/post/custom-engine-pbr/

Utilizando las normales a la hora de renderizar podemos calcular la proyección del HDRI que sería reflejada en el pixel que estamos renderizando y asociarlo a una convolución del HDRI según el cálculo de reflexión especular obtenida por el BRDF, esto genera una excelente aproximación de luz indirecta en nuestro renderizador por rasterizado utilizando materiales PBR.
![IBL](/docs/sketches/img-ibl.png)
El IBL genera una aproximacion bastante buenta de iluminacion indirecta para el rasterizado pero no perfecta, notese como el renderizado por ray tracing muestra la refexion de objetos en la escena mientras que el rasterizado no puede hacer esto

## Conclusiones
Los shaders PBR nos permiten obtener una excelente simulación de materiales y objetos con características realistas basados en propiedades físicas comprobadas y utilizando una serie de inputs estandarizados, estos pueden generar resultados relativamente similares en renderizadores basados en ray tracing o rasterización permitiendo una aproximación muy buena a realismo en tiempo real con estos últimos. Esto ha generado que este tipo de materiales se vuelvan un estándar en la industria del CGI haciendo que casi todos las compañías que crean  motores de videojuegos, softwares de manipulación 3D y herramientas CAD modernas implementen Physically Based Rendering en sus productos.

## Bibliografia
 - Basic Theory of Physically Based Rendering / Jeff Russell / Marmoset: 
 	https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
 - PBR Theory / Joey de Vries / LearnOpenGL: 
 	https://learnopengl.com/PBR/Theory
 - The PBR Guide / Substance Academy: 
 	https://academy.substance3d.com/courses/the-pbr-guide-part-1
 - Physically-Based Materials: Where Are We? / Sebastien Lagarde / Siggraph 2017: 
 	http://openproblems.realtimerendering.com/s2017/02-PhysicallyBasedMaterialWhereAreWe.pdf
 - PBR math (rasterization) / Open CASCADE Technology: 
 	https://dev.opencascade.org/doc/overview/html/specification__pbr_math.html
 - Custom Engine: Physically Based Rendering / Víctor Ávila:
	https://avilapa.github.io/post/custom-engine-pbr/

> :ToCPrevNext