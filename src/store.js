import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

const useBuilderStore = create(immer((set, get) => ({
  items: [], // Renamed from canvasComponents
  selectedItemId: null, // Renamed from selectedComponentId

  // Action to add a new item to the canvas
  addItem: (type) =>
    set((state) => {
      const newItem = {
        id: uuidv4(),
        type: type,
        properties: {},
        style: { padding: '10px', margin: '5px' },
      };

      switch (type) {
        case 'Header':
          newItem.properties.text = 'Default Header Text';
          break;
        case 'Footer':
          newItem.properties.text = 'Default Footer Text';
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
          break;
      }
      state.items.push(newItem);
    }),

  // Action to select an item for property editing
  selectItem: (id) =>
    set((state) => {
      state.selectedItemId = id;
    }),

  // Action to update properties of the selected item
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

  // Action to move an item for sorting
  moveItem: (oldIndex, newIndex) =>
    set((state) => {
      const [movedItem] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, movedItem);
    }),

  // Action to delete an item
  deleteItem: (id) =>
    set((state) => {
      state.items = state.items.filter((i) => i.id !== id);
      if (state.selectedItemId === id) {
        state.selectedItemId = null;
      }
    }),

  // Action to save the layout to LocalStorage
  saveLayout: () => {
    const { items } = get();
    try {
      const layoutJson = JSON.stringify(items);
      localStorage.setItem('mtt-builder-layout', layoutJson);
      console.log('Layout saved successfully!');
      alert('Layout saved!');
    } catch (error) {
      console.error('Failed to save layout:', error);
      alert('Error saving layout.');
    }
  },

  // Action to load the layout from LocalStorage
  loadLayout: () => {
    try {
      const layoutJson = localStorage.getItem('mtt-builder-layout');
      if (layoutJson) {
        const loadedItems = JSON.parse(layoutJson);
        set((state) => {
          state.items = loadedItems;
          state.selectedItemId = null; // Deselect on load
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
