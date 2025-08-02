import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';

const useBuilderStore = create(immer((set, get) => ({
  items: [],
  selectedItemId: null,

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
        state.items.push(newItem);
      }),
  deleteItem: (itemId) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
        // 만약 삭제된 아이템이 현재 선택된 아이템이라면, 선택 상태를 해제합니다.
        selectedItemId: state.selectedItemId === itemId ? null : state.selectedItemId,
      })),

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

  moveItem: (oldIndex, newIndex) => {
    set((state) => {
      console.log('Zustand: Attempting to move item in store.', { oldIndex, newIndex, currentItems: state.items });
      const [movedItem] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, movedItem);
      console.log('Zustand: Items after move:', state.items);
    });
  },

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
  updateItemStyle: (itemId, newStyles) =>
    set(
        produce((draft) => {
          const item = draft.items.find((i) => i.id === itemId);
          if (item) {
            // 기존 스타일 객체가 없으면 생성하고, 새로운 스타일을 병합합니다.
            if (!item.styles) {
              item.styles = {};
            }
            item.styles = { ...item.styles, ...newStyles };
          }
        })
    ),
})));

export default useBuilderStore;