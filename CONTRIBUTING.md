# Contributing to PDF Tools

Thank you for your interest in contributing to PDF Tools! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/NAMATOVU-CHRISTINE/PDFMagic.git
   cd PDFMagic
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Prettier configuration)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── config/             # Configuration files
└── contexts/           # React contexts
```

### Commit Messages
Use conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example: `feat: add PDF password protection feature`

## 🛠️ Adding New Features

### Adding a New PDF Tool

1. **Update tool configuration** in `src/config/constants.ts`
2. **Add tool to the tools array** in `src/App.tsx`
3. **Implement backend endpoint** in `server/src/index.js`
4. **Add API service method** in `src/services/api.ts`
5. **Update file processing hook** in `src/hooks/useFileProcessing.ts`
6. **Add appropriate validation** in `src/utils/fileValidation.ts`

### Adding UI Components

1. Create component in `src/components/`
2. Use TypeScript interfaces for props
3. Follow existing styling patterns (Tailwind CSS)
4. Make components responsive
5. Add proper accessibility attributes

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test
```

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for API endpoints
- Test error handling scenarios
- Ensure accessibility compliance

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples

### API Documentation
- Document all endpoints
- Include request/response examples
- Specify error codes and messages

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Describe the use case
- Explain the expected behavior
- Consider implementation complexity
- Check if similar features exist

## 🔒 Security

- Never commit sensitive information
- Validate all user inputs
- Use secure file handling practices
- Report security issues privately

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run test
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a descriptive title
   - Explain what changes were made
   - Reference any related issues

## 🎯 Priority Areas

We're especially looking for contributions in:
- PDF password protection
- PDF to image conversion
- Advanced compression algorithms
- Mobile responsiveness improvements
- Accessibility enhancements
- Performance optimizations
- Test coverage improvements

## 📞 Getting Help

- Open an issue for questions
- Check existing issues and PRs
- Review the documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to PDF Tools! 🎉