import { act, renderHook } from '@testing-library/react';
import useBuilderStore from './store';

// 모든 테스트가 실행되기 전에 초기 상태를 저장합니다.
const initialState = useBuilderStore.getState();

// 각 테스트가 실행되기 전에 스토어의 상태를 초기 상태로 리셋합니다.
beforeEach(() => {
  act(() => {
    useBuilderStore.setState(initialState);
    // 테스트 간 localStorage 영향 분리를 위해 클리어
    localStorage.clear();
  });
});

describe('useBuilderStore actions', () => {
  it('should add a new item to the store', () => {
    act(() => {
      useBuilderStore.getState().addItem('Button');
    });

    const { result } = renderHook(() => useBuilderStore());
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].type).toBe('Button');
    expect(result.current.items[0].properties.text).toBe('Click Me');
  });

  it('should move an item from one position to another', () => {
    // 1. 초기 아이템 2개 추가
    act(() => {
      useBuilderStore.getState().addItem('Button'); // index 0
      useBuilderStore.getState().addItem('Card');   // index 1
    });

    const initialItems = useBuilderStore.getState().items;
    const buttonId = initialItems[0].id;
    const cardId = initialItems[1].id;

    // 2. moveItem 액션 실행 (0 -> 1)
    act(() => {
      useBuilderStore.getState().moveItem(0, 1);
    });

    const movedItems = useBuilderStore.getState().items;

    // 3. 순서가 변경되었는지 확인
    expect(movedItems.length).toBe(2);
    expect(movedItems[0].id).toBe(cardId);   // Card가 첫 번째로 와야 함
    expect(movedItems[1].id).toBe(buttonId); // Button이 두 번째로 와야 함
  });

  it('should delete an item from the store', () => {
    act(() => {
      useBuilderStore.getState().addItem('Button');
    });

    const itemId = useBuilderStore.getState().items[0].id;
    expect(useBuilderStore.getState().items.length).toBe(1);

    act(() => {
      useBuilderStore.getState().deleteItem(itemId);
    });

    expect(useBuilderStore.getState().items.length).toBe(0);
  });

  it('should update an item\'s properties', () => {
    act(() => {
      useBuilderStore.getState().addItem('Button');
    });

    const item = useBuilderStore.getState().items[0];
    const newText = 'Updated Button Text';

    act(() => {
      useBuilderStore.getState().updateItem(item.id, { text: newText });
    });

    const updatedItem = useBuilderStore.getState().items[0];
    expect(updatedItem.properties.text).toBe(newText);
  });
});
