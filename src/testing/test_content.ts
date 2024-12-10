export {};

console.log("test_content is running!");

let index = 0;
while (true) {
  console.log(`Test message ${index}`);
  index++;
  // await new Promise((resolve) => setTimeout(resolve, 2000));
}
