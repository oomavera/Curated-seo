/**
 * City Configuration Validation Script
 * Run this to validate all city configurations
 */

import { runBuildValidation } from '../lib/buildUtils';

// Run complete build validation
const isValid = runBuildValidation();

// Exit with appropriate code
process.exit(isValid ? 0 : 1);