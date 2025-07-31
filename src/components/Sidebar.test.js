import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';
import useBuilderStore from '../store';

const initialState = useBuilderStore.getState();

beforeEach(() => {
  // 각 테스트 전에 스토어 상태를 초기화합니다.
  act(() => {
    useBuilderStore.setState(initialState, true);
  });
  // window.confirm을 모의 처리하여 항상 true를 반환하게 합니다.
  jest.spyOn(window, 'confirm').mockImplementation(() => true);
});

afterEach(() => {
  // 모의 처리한 함수를 원래대로 복원합니다.
  jest.restoreAllMocks();
});

describe('Sidebar Component', () => {
  it('should display module list when no item is selected', () => {
    render(<Sidebar />);
    expect(screen.getByText('컴포넌트')).toBeInTheDocument();
    expect(screen.getByText('버튼 모듈')).toBeInTheDocument();
    expect(screen.queryByText('속성 편집')).not.toBeInTheDocument();
  });

  it('should display property editor when an item is selected', () => {
    let buttonId;
    // 스토어에 아이템을 추가하고 선택합니다.
    act(() => {
      useBuilderStore.getState().addItem('Button');
      buttonId = useBuilderStore.getState().items[0].id;
      useBuilderStore.getState().selectItem(buttonId);
    });

    render(<Sidebar />);

    expect(screen.getByText('속성 편집')).toBeInTheDocument();
    expect(screen.getByLabelText(/Text/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Click Me')).toBeInTheDocument();
  });

  it('should update item properties on input change', async () => {
    const user = userEvent.setup();
    let buttonId;
    act(() => {
      useBuilderStore.getState().addItem('Button');
      buttonId = useBuilderStore.getState().items[0].id;
      useBuilderStore.getState().selectItem(buttonId);
    });

    render(<Sidebar />);

    const textInput = screen.getByLabelText(/Text/i);
    await user.clear(textInput);
    await user.type(textInput, 'Updated Button Text');

    // 스토어 상태가 업데이트되었는지 확인합니다.
    const updatedItem = useBuilderStore.getState().items.find(item => item.id === buttonId);
    expect(updatedItem.properties.text).toBe('Updated Button Text');
  });

  it('should delete an item when delete button is clicked', async () => {
    const user = userEvent.setup();
    let buttonId;
    act(() => {
      useBuilderStore.getState().addItem('Button');
      buttonId = useBuilderStore.getState().items[0].id;
      useBuilderStore.getState().selectItem(buttonId);
    });

    render(<Sidebar />);

    const deleteButton = screen.getByText('컴포넌트 삭제');
    await user.click(deleteButton);

    // window.confirm이 호출되었는지 확인합니다.
    expect(window.confirm).toHaveBeenCalledWith('이 컴포넌트를 삭제하시겠습니까?');

    // 스토어에서 아이템이 삭제되었는지 확인합니다.
    const items = useBuilderStore.getState().items;
    expect(items.length).toBe(0);
  });
});
