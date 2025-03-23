import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Pdf from 'react-native-pdf';

import { Text, View } from '@/components/ui';

// TODO: 本地的 pdf 可以展示，但 https（或者网络的）无法展示，原因未明
const SAMPLE_PDF_URL =
  'https://samples.leanpub.com/thereactnativebook-sample.pdf';

type PDFViewerProps = {
  url?: string;
};

export default function PDFViewer({ url = SAMPLE_PDF_URL }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfRef, setPdfRef] = useState<Pdf | null>(null);

  const goToNextPage = () => {
    if (pdfRef && currentPage < totalPages) {
      pdfRef.setPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pdfRef && currentPage > 1) {
      pdfRef.setPage(currentPage - 1);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Pdf
          ref={(ref) => setPdfRef(ref)}
          source={{ uri: url }}
          style={styles.pdf}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page) => {
            setCurrentPage(page);
          }}
          enablePaging
        />
      </View>

      <View className="flex-row items-center justify-between bg-white px-4 py-3">
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPage <= 1}
          testID="previous-page-button"
          className={`rounded-full bg-primary-500 px-5 py-2 ${
            currentPage <= 1 ? 'opacity-50' : ''
          }`}
        >
          <Text className="font-semibold text-white">上一页</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-700">
          {currentPage} / {totalPages}
        </Text>

        <TouchableOpacity
          onPress={goToNextPage}
          disabled={currentPage >= totalPages}
          testID="next-page-button"
          className={`rounded-full bg-primary-500 px-5 py-2 ${
            currentPage >= totalPages ? 'opacity-50' : ''
          }`}
        >
          <Text className="font-semibold text-white">下一页</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
