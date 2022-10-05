# rc-simple-slider

简单滑块组件

## 用法

```tsx
import { Slider } from "rc-simple-slider";

export default function App() {
    return (
        <div>
            <Slider />
        </div>
    );
}
```

## 属性

| Name                | Type                       | Default                               | Description |
|---------------------|----------------------------|---------------------------------------|-------------|
|step                 | number                     | 100                                   | 步长        |
|width                | number                     | vertical 为 true 时 6，为 false 时 300 | 宽度        |
|height               | number                     | vertical 为 true 时 300，为 false 时 6 | 高度        |
|showTip              | boolean                    | false                                 | 是否显示提示 |
|vertical             | boolean                    | false                                 | 垂直模式    |
|disabled             | boolean                    | false                                 | 是否禁用    |
|tipBgColor           | string                     | #333                                  | 提示背景颜色|
|tipFtColor           | string                     | #fff                                  | 提示字体颜色|
|contentContainerStyle| object                     | {}                                    | 容器样式    |
|progressBarColor     | string                     | #686de0                               | 进度条颜色  |
|range                | number or [number, number] | 0                                     | 选择范围    |
|showStops            | boolean                    | false                                 | 是否显示间断点 |
|marks                | object                     |         | 标记， key 的类型必须为 number 且取值在闭区间 0-100 内，每个标记可以单独设置样式 |
|debounce             | number                     |         | 去抖延迟，毫秒，仅 onInput 有用 |
|tipFormat            | Function                   | noop    | 提示信息格式化 |
|ariaValuetextFormat  | Function                   | noop    | 显示屏幕阅读器的 aria-valuenow 属性的格式化 |
|children             | Function                   |         | 替代默认的 button |
|onInput              | Function                   | noop    | 值改变时触发 |
|onChange             | Function                   | noop    | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）|

## example

### vertical
```tsx
import { Slider } from "rc-simple-slider";

export default function App() {
    return (
        <div>
            <Slider vertical/>
        </div>
    );
}
```
![](/imgs/vertical.png)

### showStops && step=10
```tsx
import { Slider } from "rc-simple-slider";

export default function App() {
    return (
        <div>
            <Slider showStops step={10}/>
        </div>
    );
}
```
![](/imgs/showStope-step%3D10.png)


### marks
```tsx
import { Slider } from "rc-simple-slider";
const marks = {
    0: 0,
    8: 8,
    50: 50,
    70: {
        style: {
            color: 'deeppink',
            fontSize: 18,
        },
        label: 70,
    },
};

export default function App() {
    return (
        <div>
            <Slider marks={marks}/>
        </div>
    );
}
```
![](/imgs/marks.png)

### children
```tsx
import { Slider } from "rc-simple-slider";
import Pikachu from './Pikachu.png';

export default function App() {
    return (
        <div>
            <Slider>
                {() => {
                    return (
                        <img
                            style={{ width: '100%', height: '100%', position: 'absolute' }}
                            src={Pikachu}
                        />
                    );
                }}
            </Slider>
        </div>
    );
}
```
![](/imgs/children.png)