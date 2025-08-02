// src/store.js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

const useBuilderStore = create(immer((set, get) => ({
  items: [],
  selectedItemId: null,

  // addItem 함수가 { type, renderedComponent } 객체를 인자로 받도록 수정
  addItem: ({ type, renderedComponent }) => // sourceCode는 더 이상 필요없을 수 있음
      set((state) => {
        const newItem = {
          id: uuidv4(),
          type: type,
          // component: null, // 원본 HTML 문자열이 필요 없다면 제거하거나 null로 설정
          properties: {},
          style: { padding: '10px', margin: '5px' },
          renderedComponent: renderedComponent, // getModules에서 온 JSX 엘리먼트 저장
        };

        switch (type.split('/').pop()) { // type에서 마지막 이름 추출하여 스위치
          case 'HeaderComponent':
            newItem.properties.text = 'Header Text'; // HeaderComponent가 렌더링할 텍스트
            break;
          case 'HeaderType1':
            newItem.properties.text = 'Header Type 1 Text';
            break;
          case 'HeaderType2':
            newItem.properties.text = 'Header Type 2 Text';
            break;
          case 'HeaderType3':
            newItem.properties.text = 'Header Type 3 Text';
            break;
          case 'Footer':
            newItem.properties.text = 'Footer Text';
            break;
          case 'Button':
            newItem.properties.text = 'Click Me';
            newItem.style = { ...newItem.style, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
            break;
          case 'Card':
            newItem.properties.title = 'Card Title';
            newItem.properties.content = 'This is the card content.';
            newItem.style = { ...newItem.style, border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' };
            break;
          default:
            // 동적 컴포넌트의 경우 properties.text를 따로 설정하지 않을 수 있습니다.
            // newItem.properties.text = type;
            break;
        }
        state.items.push(newItem);
      }),

  selectItem: (id) =>
      set((state) => {
        state.selectedItemId = id;
      }),

  updateItem: (id, newProperties, newStyle) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          if (newProperties) {
            item.properties = { ...item.properties, ...newProperties };
          }
          if (newStyle) {
            item.style = { ...item.style, ...newStyle };
          }
        }
      }),

  // moveItem 함수가 정확히 이 위치에 이 형태로 존재해야 합니다.
  moveItem: (oldIndex, newIndex) => {
    set((state) => {
      console.log('Zustand: Attempting to move item in store.', { oldIndex, newIndex, currentItems: state.items });
      const [movedItem] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, movedItem);
      console.log('Zustand: Items after move:', state.items);
    });
  }, // <-- 이 쉼표(,)가 빠지면 뒤에 함수들이 인식이 안 될 수 있습니다.

  // deleteItem, saveLayout, loadLayout 함수도 이 부분에 있어야 합니다.
  deleteItem: (id) =>
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id);
        if (state.selectedItemId === id) {
          state.selectedItemId = null;
        }
      }),

  saveLayout: () => {
    const { items: currentItems } = get();
    try {
      const layoutJson = JSON.stringify(currentItems);
      localStorage.setItem('mtt-builder-layout', layoutJson);
      console.log('Layout saved successfully!');
      alert('Layout saved!');
    } catch (error) {
      console.error('Failed to save layout:', error);
      alert('Error saving layout.');
    }
  },

  loadLayout: () => {
    try {
      const layoutJson = localStorage.getItem('mtt-builder-layout');
      if (layoutJson) {
        const loadedItems = JSON.parse(layoutJson);
        set((state) => {
          state.items = loadedItems;
          state.selectedItemId = null;
        });
        console.log('Layout loaded successfully!');
        alert('Layout loaded!');
      } else {
        console.log('No saved layout found.');
        alert('No saved layout found.');
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
      alert('Error loading layout.');
    }
  },
})));

export default useBuilderStore;