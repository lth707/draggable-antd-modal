# draggable-antd-modal

基于antd的可拖拽模态框。

## Usage
基于antd的可拖拽弹窗，通过draggable参数控制，其他配置等同[antd](https://ant.design/components/modal-cn/)
```sh
npm install -S draggable-antd-modal
```
```jsx
    const [visible, setVisible] = React.useState(false);
    return [
        <Button type="primary" onClick={()=>{
            setVisible(true);
        }}>打开弹窗</Button>,
        <DraggableAntdModal visible={visible} title="可拖拽弹窗" draggable onCancel={()=>{
            setVisible(false);
        }} onOk={()=>{
            setVisible(false);
        }}>
            <div>基于antd的可拖拽弹窗，通过draggable参数控制，其他配置等同<Button type="link" href="https://ant.design/components/modal-cn/" target="_blank" style={{padding:0}}>antd</Button></div>
        </DraggableAntdModal>
    ]
```


## LICENSE

MIT
