import BottomSheet from '@/components/UI/BottomSheet';
import Screen from '@/components/UI/Screen';
import AnalysisHeader from '@/features/diagnostic/components/AnalysisHeader';
import BottomActions from '@/features/diagnostic/components/BottomActions';
import FinancialCard from '@/features/diagnostic/components/FinancialCard';
import HeroSection from '@/features/diagnostic/components/HeroSection';
import LeadCapture from '@/features/diagnostic/components/LeadCapture';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const BasicResult = () => {
    const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
    return (
        <Screen scrollable>
            <AnalysisHeader
            // title="PhysaFlow"
            // onBack={...}
            // rightIcon="account-circle"
            // onRightPress={...}
            />
            <HeroSection
            // status="Analysis Complete"
            // percentage={34}
            // title="Stranded Capacity"
            // equivalent="3.4 MW"
            />
            <FinancialCard
            // title="Estimated Financial Exposure"
            // value="$1.2M - $1.5M"
            // subtitle="Annual Loss"
            // benchmark="22% above industry average"
            // source="Data Center Benchmark v4.2"
            />
            {/* <FlowVisualization /> */}
            {/* <MetricsGrid
                metrics={[
                    {
                        title: 'PUE Factor',
                        value: '1.62',
                        subtitle: '+0.12 Δ',
                    },
                    {
                        title: 'Carbon Cost',
                        value: '$45K',
                        subtitle: '/year',
                    },
                    {
                        title: 'Utilization',
                        value: '66.2%',
                    },
                    {
                        title: 'Health Score',
                        value: 'Critical',
                        valueColor: Colors.dark.error,
                    },
                ]}
            /> */}
            <BottomActions
                onUnlockAnalysis={() => setLeadCaptureOpen(true)}
            />
            <BottomSheet
                visible={leadCaptureOpen}
                onClose={() => setLeadCaptureOpen(false)}
            >
                <LeadCapture />
            </BottomSheet>
        </Screen>
    );
}

const styles = StyleSheet.create({})

export default BasicResult;
