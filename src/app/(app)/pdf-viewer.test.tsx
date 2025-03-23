import React from 'react';

import { cleanup, screen, setup } from '@/lib/test-utils';

import PDFViewer from './pdf-viewer';

// 模拟 react-native-pdf
jest.mock('react-native-pdf', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: class Pdf extends React.Component {
      setPage = jest.fn();

      render() {
        return <View />;
      }
    },
  };
});

afterEach(cleanup);

describe('PDFViewer', () => {
  // 设置部分
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 测试用例
  describe('渲染', () => {
    test('正确渲染组件', async () => {
      setup(<PDFViewer />);

      // 验证页码显示正确
      expect(screen.getByText('1 / 0')).toBeOnTheScreen();

      // 验证翻页按钮存在
      expect(screen.getByTestId('previous-page-button')).toBeOnTheScreen();
      expect(screen.getByTestId('next-page-button')).toBeOnTheScreen();
    });
  });

  describe('交互', () => {
    test('禁用上一页按钮当在第一页时', async () => {
      const { getByTestId } = setup(<PDFViewer />);

      const previousButton = getByTestId('previous-page-button');
      expect(previousButton).toBeDisabled();
    });

    test('禁用下一页按钮当在最后一页时', async () => {
      const { getByTestId } = setup(<PDFViewer />);

      // 初始状态下，总页数为0，当前页为1，则下一页按钮应该被禁用
      const nextButton = getByTestId('next-page-button');
      expect(nextButton).toBeDisabled();
    });
  });
});
