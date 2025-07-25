interface IconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  role?: string;
  focusable?: boolean;
  withHover?: boolean;
  withBreathing?: boolean;
  withEntrance?: boolean;
}

const sizeClasses = {
  xxs: 'h-1.5 w-1.5 sm:h-1.5 sm:w-1.5',
  xs: 'h-3 w-3 sm:h-3.5 sm:w-3.5',
  sm: 'h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4',
  md: 'h-5 w-5 sm:h-6 sm:w-6 md:h-5 md:w-5',
  lg: 'h-6 w-6 sm:h-7 sm:w-7 md:h-6 md:w-6',
  xl: 'h-8 w-8 sm:h-9 sm:w-9 md:h-8 md:w-8'
};

const getIconClasses = (
  size: IconProps['size'] = 'sm',
  className?: string,
  withHover = false,
  withBreathing = false,
  withEntrance = false
) => {
  const baseClasses = className || sizeClasses[size];
  const animationClasses = [];
  
  if (withHover) {
    animationClasses.push(
      'transition-all duration-300 ease-out',
      'hover:scale-110 hover:text-primary/80',
      'focus:scale-110 focus:text-primary/80',
      'active:scale-95'
    );
  }
  
  
  if (withEntrance) {
    animationClasses.push('animate-fade-in');
  }
  
  // Ensure minimum touch target for mobile
  animationClasses.push('min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0');
  
  return [baseClasses, ...animationClasses].join(' ');
};

export const HomeIcon = ({
  className,
  size = 'sm',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  role,
  focusable = false,
  withHover = false,
  withBreathing = false,
  withEntrance = false
}: IconProps) => {
  const iconClasses = getIconClasses(size, className, withHover, withBreathing, withEntrance);
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.001 512.001"
      className={iconClasses}
      fill="currentColor"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={role}
      focusable={focusable}
      style={{
        willChange: withHover ? 'transform' : 'auto',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      <path d="M490.134,185.472L338.966,34.304c-45.855-45.737-120.076-45.737-165.931,0L21.867,185.472   C7.819,199.445-0.055,218.457,0,238.272v221.397C0.047,488.568,23.475,511.976,52.374,512h407.253   c28.899-0.023,52.326-23.432,52.373-52.331V238.272C512.056,218.457,504.182,199.445,490.134,185.472z M448,448H341.334v-67.883   c0-44.984-36.467-81.451-81.451-81.451c0,0,0,0,0,0h-7.765c-44.984,0-81.451,36.467-81.451,81.451l0,0V448H64V238.272   c0.007-2.829,1.125-5.541,3.115-7.552L218.283,79.552c20.825-20.831,54.594-20.835,75.425-0.01c0.003,0.003,0.007,0.007,0.01,0.01   L444.886,230.72c1.989,2.011,3.108,4.723,3.115,7.552V448z"/>
    </svg>
  );
};

export const LogEmotionIcon = ({
  className,
  size = 'sm',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  role,
  focusable = false,
  withHover = false,
  withBreathing = false,
  withEntrance = false
}: IconProps) => {
  const iconClasses = getIconClasses(size, className, withHover, withBreathing, withEntrance);
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={iconClasses}
      fill="currentColor"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={role}
      focusable={focusable}
      style={{
        willChange: withHover ? 'transform' : 'auto',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      <path d="m18.5,0H5.5C2.467,0,0,2.468,0,5.5v13c0,3.032,2.467,5.5,5.5,5.5h10.343c1.469,0,2.85-.572,3.889-1.611l2.657-2.656c1.039-1.039,1.611-2.42,1.611-3.89V5.5c0-3.032-2.467-5.5-5.5-5.5ZM5.5,21c-1.378,0-2.5-1.121-2.5-2.5V5.5c0-1.379,1.122-2.5,2.5-2.5h13c1.378,0,2.5,1.121,2.5,2.5,0,0-.002,10.448-.005,10.5h-2.995c-1.105,0-2,.895-2,2v2.994c-.052.003-10.5.006-10.5.006Zm10-7.5h-2v2c0,.828-.671,1.5-1.5,1.5s-1.5-.672-1.5-1.5v-2h-2c-.829,0-1.5-.672-1.5-1.5s.671-1.5,1.5-1.5h2v-2c0-.828.671-1.5,1.5-1.5s1.5.672,1.5,1.5v2h2c.829,0,1.5.672,1.5,1.5s-.671,1.5-1.5,1.5Z"/>
    </svg>
  );
};

export const GroundingIcon = ({
  className,
  size = 'sm',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  role,
  focusable = false,
  withHover = false,
  withBreathing = false,
  withEntrance = false
}: IconProps) => {
  const iconClasses = getIconClasses(size, className, withHover, withBreathing, withEntrance);
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={iconClasses}
      fill="currentColor"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={role}
      focusable={focusable}
      style={{
        willChange: withHover ? 'transform' : 'auto',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      <path d="m0,16.5v-3c0-3.033,2.468-5.5,5.5-5.5h1c.828,0,1.5.671,1.5,1.5s-.672,1.5-1.5,1.5h-1c-1.379,0-2.5,1.122-2.5,2.5v3c0,.829-.672,1.5-1.5,1.5s-1.5-.671-1.5-1.5Zm18.5-8.5h-1c-.828,0-1.5.671-1.5,1.5s.672,1.5,1.5,1.5h1c1.379,0,2.5,1.122,2.5,2.5v3c0,.829.672,1.5,1.5,1.5s1.5-.671,1.5-1.5v-3c0-3.033-2.468-5.5-5.5-5.5Zm3.245,12.801c-.528.309-1.263.234-1.803-.149-1.162-.827-2.723-.826-3.883,0-.627.444-1.494.443-2.117,0-1.162-.827-2.723-.826-3.883,0-.627.444-1.494.443-2.117,0-1.162-.827-2.723-.826-3.883,0-.546.387-1.27.462-1.807.149-.713-.414-1.634-.172-2.05.544s-.173,1.634.544,2.051c1.528.888,3.566.756,5.051-.299.127-.092.275-.092.406,0,1.641,1.165,3.949,1.166,5.594,0,.127-.092.275-.092.406,0,1.641,1.165,3.949,1.166,5.594,0,.127-.092.275-.092.406,0,.82.583,1.813.903,2.796.903.793,0,1.573-.209,2.255-.606.716-.417.958-1.335.542-2.051-.418-.718-1.336-.958-2.052-.542ZM8.449,5h2.051v11.5c0,.829.672,1.5,1.5,1.5s1.5-.671,1.5-1.5V5h2.052c.72,0,1.08-.87.571-1.379L12.857.355c-.474-.474-1.241-.474-1.715,0l-3.265,3.265c-.509.509-.149,1.379.571,1.379Z"/>
    </svg>
  );
};

export const StressReliefIcon = ({
  className,
  size = 'sm',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  role,
  focusable = false,
  withHover = false,
  withBreathing = false,
  withEntrance = false
}: IconProps) => {
  const iconClasses = getIconClasses(size, className, withHover, withBreathing, withEntrance);
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={iconClasses}
      fill="currentColor"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={role}
      focusable={focusable}
      style={{
        willChange: withHover ? 'transform' : 'auto',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      <path d="m14.881,24c-1.105,0-2.144-.499-2.881-1.377-.737.878-1.775,1.377-2.881,1.377-2.271,0-4.119-1.794-4.119-4,0-.369.066-.761.189-1.189-.428.123-.82.189-1.189.189-2.206,0-4-1.848-4-4.119,0-1.105.499-2.144,1.377-2.881-.878-.737-1.377-1.775-1.377-2.881,0-2.271,1.794-4.119,4-4.119.369,0,.761.066,1.189.189-.123-.428-.189-.82-.189-1.189C5,1.794,6.848,0,9.119,0c1.105,0,2.144.499,2.881,1.377.737-.878,1.775-1.377,2.881-1.377,2.271,0,4.119,1.794,4.119,4,0,.369-.066.761-.189,1.189.428-.123.82-.189,1.189-.189,2.206,0,4,1.848,4,4.119,0,1.105-.499,2.144-1.377,2.881.878.737,1.377,1.775,1.377,2.881,0,2.271-1.794,4.119-4,4.119-.369,0-.761-.066-1.189-.189.123.428.189.82.189,1.189,0,2.206-1.848,4-4.119,4Zm-2.881-4.034c.315,0,.611.148.8.4l.658.878c.36.48.879.756,1.422.756,1.023,0,2.119-.804,2.119-2,0-.664-.61-1.953-.904-2.572-.181-.382-.102-.836.197-1.135.298-.299.752-.379,1.135-.197.62.293,1.909.904,2.572.904,1.196,0,2-1.096,2-2.119,0-.543-.275-1.062-.756-1.422l-.878-.658c-.251-.189-.4-.485-.4-.8s.148-.611.4-.8l.878-.658c.48-.36.756-.879.756-1.422,0-1.023-.804-2.119-2-2.119-.664,0-1.953.61-2.572.904-.383.181-.836.102-1.135-.197-.299-.299-.377-.753-.197-1.135.293-.62.904-1.909.904-2.572,0-1.196-1.096-2-2.119-2-.543,0-1.062.276-1.423.757l-.658.877c-.378.503-1.223.503-1.601,0l-.658-.878c-.36-.48-.879-.756-1.422-.756-1.023,0-2.119.804-2.119,2,0,.664.61,1.953.904,2.572.181.382.102.836-.197,1.135-.298.299-.753.378-1.135.197-.62-.293-1.909-.904-2.572-.904-1.196,0-2,1.096-2,2.119,0,.543.276,1.062.757,1.423l.877.658c.251.189.4.485.4.8s-.148.611-.4.8l-.878.658c-.48.36-.756.879-.756,1.422,0,1.023.804,2.119,2,2.119.664,0,1.953-.61,2.572-.904.382-.182.836-.103,1.135.197.299.299.377.753.197,1.135-.293.62-.904,1.909-.904,2.572,0,1.196,1.096,2,2.119,2,.543,0,1.062-.276,1.423-.757l.658-.877c.189-.251.485-.4.8-.4Z"/>
    </svg>
  );
};