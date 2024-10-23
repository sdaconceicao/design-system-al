// Automatically resolve all classes in .module.scss files
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
