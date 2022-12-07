import DocumentPage from '../pages/_document';

describe('DocumentPage', () => {
  it('should render successfully', () => {
    // @ts-ignore
    const doc = new DocumentPage();
    expect(doc.render()).toMatchInlineSnapshot(`
    <Html
      lang="en"
    >
      <Head />
      <body>
        <div
          id="overlays"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  `);
  });
});
