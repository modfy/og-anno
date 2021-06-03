[![GitHub Socialify][socialify-image]][socialify-edit-link]

This is a general purpose og image generator, that can be used for creating any og images.

## Usage

Project site: https://og.cryogenicplanet.tech

### Social Image as a Service

Click on the image to use the link anywhere, the image will be programmatically generated with live data. This means the badges will automatically update.

**Recommended for `README` files or `img` tags.**

### Image Download

You can download the image as a `.png`, `.jpeg` or `.webp` and use it anywhere.

## Development

- Create a GitHub token from `Settings > Developer settings > Personal access tokens`, you'll need it in when setting up environemnt variables.
- Run the following commands to set up the Development server:

  ```shell
  # Clone
  git clone https://github.com/wei/socialify.git && cd $_

  # Set environment variables in .env
  cp .env.example .env

  yarn install
  yarn build
  yarn dev
  ```

## License

- [MIT](https://wei.mit-license.org)

## Acknowlegement

This is based on a project [@Wei]() and I built a while back called socialify.
