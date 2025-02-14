# Cat Selector

A fun, interactive wheel spinner that helps users randomly select a cat breed. Built with React and Tailwind CSS.

![Cat Selector Demo](demo.gif)

## Features

- Interactive spinning wheel with smooth animations
- 10 different cat breeds with unique color coding
- Visual feedback during spinning and resetting
- Responsive design with clean UI
- Progress indicator during spin
- Automatic reset after selection

## Technologies Used

- React
- Tailwind CSS
- Lucide Icons
- CSS Animations

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cat-selector.git
cd cat-selector
```

2. Navigate to the project directory:

```bash
cd cat-selector
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Usage

1. Click the spin button (circular button with rotate icon) to start
2. Watch the wheel spin and randomly select a cat breed
3. The selected breed will be displayed below the wheel
4. After 10 seconds, the wheel will smoothly reset for another spin

## Component Structure

### Main Components

- `CatSelector`: The main component containing the wheel and logic
- Wheel: Displays the color-coded sections for each breed
- Legend: Shows the breed names with corresponding colors
- Selection Display: Shows the currently selected breed

### Color Scheme

Each cat breed has a unique color combination:

- Background colors: Soft pastel shades
- Text colors: Darker, matching variants
- Dividing lines: Subtle white separators

### Animation States

1. **Spinning**

   - Duration: 3 seconds
   - Easing: Cubic bezier for realistic motion

2. **Selection Display**

   - Duration: 10 seconds
   - Shows selected breed with matching color

3. **Reset Animation**
   - Duration: 1.5 seconds
   - Smooth transition back to starting position

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Inspired by wheel of fortune style selectors
- Color scheme based on cat breed characteristics
- UI design influenced by modern web applications
