export default () => {
  return document.getElementsByName('csrf-token')[0] as HTMLMetaElement;
}