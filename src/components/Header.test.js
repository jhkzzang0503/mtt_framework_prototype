import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header'; // Assuming Header.js is in the same directory
import useBuilderStore from '../store';

const initialState = useBuilderStore.getState();

beforeEach(() => {
  // 스토어 상태 초기화
  act(() => {
    useBuilderStore.setState(initialState, true);
  });
  // localStorage와 alert 모의 처리
  localStorage.clear();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Header Component - Layout Save and Load', () => {
  it('should save the current layout to localStorage', async () => {
    const user = userEvent.setup();
    // 1. 테스트용 아이템 추가
    act(() => {
      useBuilderStore.getState().addItem('Card');
    });

    render(<Header />);

    // 2. 'Save Layout' 버튼 클릭
    const saveButton = screen.getByText('Save Layout');
    await user.click(saveButton);

    // 3. localStorage에 데이터가 저장되었는지 확인
    const savedLayout = localStorage.getItem('mtt-builder-layout');
    expect(savedLayout).not.toBeNull();
    const parsedLayout = JSON.parse(savedLayout);
    expect(parsedLayout.length).toBe(1);
    expect(parsedLayout[0].type).toBe('Card');

    // 4. 알림창이 호출되었는지 확인
    expect(window.alert).toHaveBeenCalledWith('Layout saved!');
  });

  it('should load a layout from localStorage and update the store', async () => {
    const user = userEvent.setup();
    // 1. 테스트용 레이아웃을 localStorage에 미리 저장
    const testLayout = [{ id: 'test-id-1', type: 'Button', properties: { text: 'Loaded Button' }, style: {} }];
    localStorage.setItem('mtt-builder-layout', JSON.stringify(testLayout));

    // 스토어는 비어있는 상태로 시작
    expect(useBuilderStore.getState().items.length).toBe(0);

    render(<Header />);

    // 2. 'Load Layout' 버튼 클릭
    const loadButton = screen.getByText('Load Layout');
    await user.click(loadButton);

    // 3. 스토어 상태가 로드된 데이터로 업데이트되었는지 확인
    const loadedItems = useBuilderStore.getState().items;
    expect(loadedItems.length).toBe(1);
    expect(loadedItems[0].id).toBe('test-id-1');
    expect(loadedItems[0].properties.text).toBe('Loaded Button');

    // 4. 알림창이 호출되었는지 확인
    expect(window.alert).toHaveBeenCalledWith('Layout loaded!');
  });
});
