import React, { useState, useEffect } from 'react'; // 'useEffect'를 import 합니다.
import useBuilderStore from '@/store';

const ModulesSet = ({ selectedModule, onStyleChange }) => {
  const [bootstrapClasses, setBootstrapClasses] = useState('');
  const [customStyles, setCustomStyles] = useState('');
  const [className, setClassName] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [fileName, setFileName] = useState('');

  const handleGenerate = () => setModalOpen(true);
  const { items } = useBuilderStore();


  // selectedModule이 변경될 때 상태를 업데이트하는 useEffect
  useEffect(() => {
    if (selectedModule && selectedModule.styles) {
      setBootstrapClasses(selectedModule.styles.bootstrapClasses || '');
      // customStyles는 객체이므로 JSON.stringify를 사용합니다.
      setCustomStyles(JSON.stringify(selectedModule.styles.customStyles, null, 2) || '');
      setClassName(selectedModule.styles.className || '');
    } else {
      // 선택된 모듈이 없으면 입력 필드를 비웁니다.
      setBootstrapClasses('');
      setCustomStyles('');
      setClassName('');
    }
  }, [selectedModule]); // selectedModule이 바뀔 때마다 이 effect가 실행됩니다.

  const handleCreateFile = () => {
    const imports = items.map(item => `import ${item.type.split('/').pop()} from '@/components/modules/${item.type}';`).join('\n');
    // [수정] 스타일이 적용된 컴포넌트 코드를 생성하도록 수정
    const components = items.map(item => {
      const styleProp = item.styles?.customStyles ? `style={${JSON.stringify(item.styles.customStyles)}}` : '';
      const classProp = `className="${item.styles?.bootstrapClasses || ''} ${item.styles?.className || ''}"`.trim();
      return `<${item.type.split('/').pop()} ${classProp} ${styleProp} />`;
    }).join('\n');

    const fileContent = `
            ${imports}
            
            const ${fileName}Component = () => {
              return (
                <div>
                  ${components}
                </div>
              );
            };
            
            export default ${fileName}Component;
        `;

    const fullFilePath = '/src/' + filePath + '/' + fileName + '.jsx';
    /*console.log(JSON.stringify({
      action: 'create_file',
      file_path: fullFilePath,
      file_content: fileContent,
    }));*/

    console.log("fileContent : ", fileContent);
    setModalOpen(false);
  };

  const handleStyleChange = () => {
    if (onStyleChange) {
      let parsedCustomStyles = {};
      try {
        // 입력된 문자열을 다시 JSON 객체로 파싱합니다.
        parsedCustomStyles = customStyles ? JSON.parse(customStyles) : {};
      } catch (error) {
        console.error("Invalid JSON in custom styles:", error);
        // 파싱 실패 시 빈 객체로 처리합니다.
      }

      onStyleChange({
        bootstrapClasses,
        customStyles: parsedCustomStyles, // 파싱된 객체를 전달
        className,
      });
    }
  };

  // Custom Styles 입력 필드를 textarea로 변경하여 가독성을 높였습니다.
  return (
      <div className="style-editor-panel">
        <h2>Modules Style Settings</h2>
        {selectedModule && (
            <div>
              <h3>{selectedModule.name}</h3>
              <div className="form-group">
                <label htmlFor="bootstrapClasses">Bootstrap Classes:</label>
                <input
                    type="text"
                    id="bootstrapClasses"
                    value={bootstrapClasses}
                    onChange={(e) => setBootstrapClasses(e.target.value)}
                    onBlur={handleStyleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customStyles">Custom Styles (JSON):</label>
                <textarea
                    id="customStyles"
                    value={customStyles}
                    onChange={(e) => setCustomStyles(e.target.value)}
                    onBlur={handleStyleChange}
                    rows={5}
                />
              </div>
              <div className="form-group">
                <label htmlFor="className">Custom Class Name:</label>
                <input
                    type="text"
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    onBlur={handleStyleChange}
                />
              </div>
            </div>
        )}
        {modalOpen && (
            <div className="modal-overlay"> {/* 모달 오버레이에 클래스 추가 */}
              <div className="modal-content" style={{background: "var(--bs-body-bg)"}}> {/* 모달 콘텐츠에 클래스 추가 */}
                <input type="text" value={filePath} onChange={e => setFilePath(e.target.value)}
                       placeholder="경로 (예: components/generated)" className="modal-input"/><br/> {/* 입력 필드에 클래스 추가 */}
                <input type="text" value={fileName} onChange={e => setFileName(e.target.value)}
                       placeholder="파일명 (예: MyNewComponent)" className="modal-input"/><br/> {/* 입력 필드에 클래스 추가 */}
                <div className="modal-actions"> {/* 모달 버튼 래퍼에 클래스 추가 */}
                  <button onClick={() => setModalOpen(false)} className="btn btn-secondary modal-btn-cancel">취소</button> {/* 취소 버튼에 클래스 추가 */}
                  <button onClick={handleCreateFile} className="btn btn-primary modal-btn-generate">생성</button> {/* 생성 버튼에 클래스 추가 */}
                </div>
              </div>
            </div>
        )}
        <button onClick={handleGenerate} className="generate-btn">생성</button>
      </div>
  );
};

export default ModulesSet;