// src/components/BuilderCanvas.js
import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import useBuilderStore from '../store';
import SortableItem from './SortableItem';

// 더 이상 개별 컴포넌트를 여기에 직접 임포트하여 switch문에서 분기할 필요가 없습니다.
// 왜냐하면 renderedComponent에 이미 완전한 JSX 엘리먼트가 들어있기 때문입니다.
// import HeaderComponent from './modules/header/HeaderComponent';
// import HeaderType1Component from './modules/header/HeaderType1Component';
// ...

// Mock 컴포넌트들 (필요하다면 유지, 아니면 store에서 완전히 제어)
const Button = ({ text, style }) => <button style={style}>{text || 'Button'}</button>;
const Card = ({ title, content, style }) => (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', ...style }}>
        <h4>{title || 'Card Title'}</h4>
        <p>{content || 'Card content goes here.'}</p>
    </div>
);
const Footer = ({ text, style }) => <footer style={style}>{text || 'Footer Text'}</footer>;


const BuilderCanvas = () => {
    const { items, addItem, selectItem, selectedItemId } = useBuilderStore();
    const [over, setOver] = useState(null);
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    useDndMonitor({
        onDragOver: (event) => {
            setOver(event.over?.id);
        },
        onDragLeave: (event) => {
            setOver(null);
        },
        onDragEnd: (event) => {
            setOver(null);
        }
    });

    const canvasStyle = {
        backgroundColor: over ? '#e6f7ff' : undefined,
        border: over ? '2px dashed #4A90E2' : undefined,
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    };

    const renderComponent = (item) => {
        // item.renderedComponent에 저장된 JSX 엘리먼트를 직접 반환합니다.
        // 이 엘리먼트는 이미 getModules에서 React.Suspense로 래핑되어 있습니다.
        // 여기서 properties나 style을 적용하려면, item.renderedComponent를 cloneElement로 감싸야 할 수 있습니다.
        // 하지만 getModules에서 이미 prop을 받아서 <Component prop={value} /> 형태로 생성하고 있다면, 여기서는 item.renderedComponent만 반환하면 됩니다.

        // 현재 getModules.js를 보면 <Component />를 직접 넣고 있으므로,
        // 여기서는 item.renderedComponent를 그대로 반환합니다.
        // 만약 여기에 속성을 추가하고 싶다면 React.cloneElement를 사용해야 합니다.

        // 예를 들어, item.properties.text를 HeaderComponent에 전달하려면,
        // getModules.js에서 Component 호출 시 text prop을 전달하거나
        // 여기에서 cloneElement를 사용해야 합니다.
        // 여기서는 가장 간단한 형태로 item.renderedComponent를 반환합니다.

        // 단, properties나 style을 동적으로 적용하려면 이렇게 해야 합니다.
        // const Component = item.renderedComponent.type; // React.Suspense가 아닌 실제 컴포넌트를 가져옴
        // if (Component) {
        //     return React.cloneElement(item.renderedComponent, {
        //         // 여기에 item.properties나 item.style을 실제 컴포넌트에 맞는 prop으로 전달
        //         text: item.properties.text, // HeaderComponent에 text prop이 필요하다면
        //         style: item.style // 스타일을 컴포넌트가 받아서 처리한다면
        //         // ... 기타 prop들
        //     });
        // }


        // 가장 간단한 방법: getModules에서 이미 필요한 props가 컴포넌트에 주입되어 있다고 가정하고
        // 저장된 JSX 엘리먼트를 그대로 렌더링합니다.
        // 만약 동적으로 스타일을 적용해야 한다면, item.renderedComponent가 <div> 등으로 시작하지 않고
        // 직접 <Component>로 시작해야 cloneElement를 쉽게 적용할 수 있습니다.
        if (item.renderedComponent) {
            return item.renderedComponent;
        } else {
            return <div>Error: Component not found or incorrectly rendered for type: {item.type}</div>;
        }
    };

    const handleClick = (e, id) => {
        e.stopPropagation();
        selectItem(id);
    };

    return (
        <div ref={setNodeRef} className="builder-canvas" onClick={() => selectItem(null)} style={canvasStyle}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                    <SortableItem key={item.id} id={item.id} onClick={(e) => handleClick(e, item.id)} isSelected={selectedItemId === item.id}>
                        {renderComponent(item)}
                    </SortableItem>
                ))}
            </SortableContext>
            {items.length === 0 && (
                <div className="canvas-placeholder">
                    <p>Drop modules here from the sidebar to build your page.</p>
                </div>
            )}
        </div>
    );
};

export default BuilderCanvas;