import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ThreeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Silently catch WebGL / Three.js errors
    if (
      error.message?.includes('WebGL') ||
      error.message?.includes('WebGLRenderer') ||
      error.message?.includes('three')
    ) {
      return;
    }
    console.warn('ThreeBackground error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#050505' }}>
          {/* CSS-only luxury particle fallback */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(27,94,32,0.06) 0%, transparent 50%)',
          }} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ThreeErrorBoundary;
