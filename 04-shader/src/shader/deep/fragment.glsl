precision lowp float;
varying vec2 vUv;
uniform float uTime;

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}
void main() {
//    1、通过顶点对应的uv，决定每一个像素在uv图像的位置，通过这个位置x，y绝ing颜色
//    gl_FragColor = vec4(vUv,0,1);

//    2、对第一种变形
//    gl_FragColor = vec4(vUv,1,1);

//    3、利用uv实现渐变, 从左到右
//    float strength = vUv.x;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    4、利用uv实现渐变，从下到上
//    float strength = vUv.y;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    5、利用uv实现渐变，从上到下
//    float strength = 1.0 - vUv.y;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    6、利用uv实现段范围渐变
//    float strength = vUv.y * 10.0;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    7、通过取模达到反复效果
//    float strength = mod(vUv.y * 10.0, 1.0);
//    gl_FragColor = vec4(strength,strength,strength,1);

//    8、利用step(edge,x) 如果 x < edge,返回0.0，否则返回1.0
//    float strength = mod(vUv.y * 10.0, 1.0);
//    strength = step(0.5,strength);
//    gl_FragColor = vec4(strength,strength,strength,1);

//    9、条纹相加
//    float strength = step(0.5,mod(vUv.x * 10.0, 1.0));
//    strength += step(0.5,mod(vUv.y * 10.0, 1.0));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    10、条纹相乘
//    float strength = step(0.5,mod(vUv.x * 10.0, 1.0));
//    strength *= step(0.5,mod(vUv.y * 10.0, 1.0));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    11、条纹相减
//    float strength = step(0.8,mod(vUv.x * 10.0, 1.0));
//    strength -= step(0.8,mod(vUv.y * 10.0, 1.0));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    12、方块图形
//    float strength = step(0.2,mod(vUv.x * 10.0, 1.0));
//    strength *= step(0.2,mod(vUv.y * 10.0, 1.0));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    13、条纹相乘
//    float barX = step(0.4,mod(vUv.x * 10.0, 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
//    float barY = step(0.4,mod(vUv.y * 10.0, 1.0)) * step(0.8,mod(vUv.x * 10.0, 1.0));
//    float strength = barX + barY;
//    gl_FragColor = vec4(vUv,1,strength);

//    14、T形图
//    float barX = step(0.4,mod((vUv.x+uTime * 0.1) * 10.0, 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
//    float barX = step(0.4,mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
//    float barY = step(0.4,mod(vUv.y * 10.0, 1.0)) * step(0.8,mod(vUv.x * 10.0, 1.0));
//    float strength = barX + barY;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    15、利用绝对值
//    float strength = abs(vUv.x - 0.5);
//    gl_FragColor = vec4(strength,strength,strength,1);

//    16、取最小值
//    float strength = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    17、取最大值
//    float strength = 1.0 - max(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    18、step
//    float strength = step(0.2, max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    19、小正方体
//    float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    20、利用取整，实现条纹渐变
//    float strength = floor(vUv.x * 10.0) / 10.0;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    21、取整
//    float strength = floor(vUv.y * 10.0) / 10.0;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    22、条纹相乘 渐变格子
//    float strength = floor(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    23、向上取整
//    float strength = ceil(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
//    gl_FragColor = vec4(strength,strength,strength,1);

//    24、随机效果
//    float strength = random(vUv);
//    gl_FragColor = vec4(strength,strength,strength,1);

//    25、随机+格子效果
//    float strength = ceil(vUv.y * 10.0) / 10.0 * ceil(vUv.x * 10.0) / 10.0;
//    strength = random(vec2(strength,strength));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    26、依据length
//    float strength = length(vUv);
//    gl_FragColor = vec4(strength,strength,strength,1);

//    27、计算两个向量的距离
//    float strength = distance(vUv,vec2(0.5,0.5));
//    gl_FragColor = vec4(strength,strength,strength,1);

//    28、根据相除实现星星
//    float strength = 0.15 / distance(vUv,vec2(0.5,0.5)) - 1.0;
//    gl_FragColor = vec4(strength,strength,strength,strength);

//    29、设置uv水平或者竖直变量
//    float strength = 0.15 / distance(vec2(vUv.x,(vUv.y - 0.5) * 5.0),vec2(0.5,0.5)) - 1.0;
//    gl_FragColor = vec4(strength,strength,strength,strength);

//    30、十字交叉星星
    float strength = 0.15 / distance(vec2(vUv.x,(vUv.y - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    strength += 0.15 / distance(vec2(vUv.y,(vUv.x - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    gl_FragColor = vec4(strength,strength,strength,1);
}
