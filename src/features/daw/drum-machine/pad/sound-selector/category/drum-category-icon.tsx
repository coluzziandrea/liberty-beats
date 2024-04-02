import { DrumCategory } from '../../../../../../model/drums/category/drum-category'
import DrumMachineClapIcon from './drum-machine-clap-icon'
import DrumMachineClosedHiHatIcon from './drum-machine-closed-hh-icon'
import DrumMachineCrashIcon from './drum-machine-crash-icon'
import DrumMachineKickIcon from './drum-machine-kick-icon'
import DrumMachineOpenHiHatIcon from './drum-machine-open-hh-icon'
import DrumMachineRideIcon from './drum-machine-ride-icon'
import DrumMachineSnareIcon from './drum-machine-snare-icon'
import DrumMachineTomIcon from './drum-machine-tom-icon'

export type DrumCategoryIconProps = React.SVGProps<SVGSVGElement> & {
  category: DrumCategory
}

export const DrumMachineCategoryIcon = ({
  category,
  ...svgProps
}: DrumCategoryIconProps) => {
  switch (category) {
    case 'HAND_CLAP':
      return <DrumMachineClapIcon {...svgProps} />
    case 'CLOSED_HI_HAT':
      return <DrumMachineClosedHiHatIcon {...svgProps} />
    case 'OPEN_HI_HAT':
      return <DrumMachineOpenHiHatIcon {...svgProps} />
    case 'CRASH':
      return <DrumMachineCrashIcon {...svgProps} />
    case 'KICK':
      return <DrumMachineKickIcon {...svgProps} />
    case 'RIDE':
      return <DrumMachineRideIcon {...svgProps} />
    case 'SNARE':
      return <DrumMachineSnareIcon {...svgProps} />
    case 'TOM':
      return <DrumMachineTomIcon {...svgProps} />
  }
}
