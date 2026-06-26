import { useCaseMode } from '../context/CaseModeContext'

export function useCaseStudyMode() {
  return useCaseMode().isSimple
}
