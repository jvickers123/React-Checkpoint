import DocumentPage from '../pages/_document';

describe('DocumentPage', () => {
  it('should render successfully', () => {
    // @ts-ignore
    const doc = new DocumentPage();
    const renderedDoc = doc.render();

    const body = renderedDoc.props.children[1];
    console.log(body.props.children);
  });
});
