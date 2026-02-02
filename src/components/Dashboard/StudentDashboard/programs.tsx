import React, { useState, useMemo, useEffect } from "react";
import {
  useGetAllProgrammesQuery,
  useGetProgrammeLevelsQuery,
  useGetProgrammeClustersQuery,
  useGetProgrammesWithFiltersQuery,
} from "../../../Features/programmes/ProgrammesAPI";
import type { TProgramme } from "../../../Features/programmes/ProgrammesAPI";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
  FaTimes,
  FaBookmark,
  FaBookmark as FaBookmarkSolid,
  FaUniversity,
  FaGraduationCap,
  FaStar,
  FaHeartbeat,
  FaChartLine,
  FaEye,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

type SortType =
  | "name-asc"
  | "name-desc"
  | "university-asc"
  | "university-desc"
  | "minAGP-asc"
  | "minAGP-desc";

type ViewMode = "grid" | "list" | "compact";

interface ProgrammeCardProps {
  programme: TProgramme;
  viewMode: ViewMode;
  isBookmarked: boolean;
  onToggleBookmark: (programmeId: number) => void;
  onViewDetails?: (programmeId: number) => void;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({
  programme,
  viewMode,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
}) => {
  const isRecentlyAdded = () => programme.programmeID > 1000;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(programme.programmeID);
    }
  };

  if (viewMode === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{programme.name}</h4>
            <p className="text-xs text-gray-600 truncate">{programme.university?.name}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(programme.programmeID);
            }}
            className="ml-2 text-gray-400 hover:text-yellow-500"
          >
            {isBookmarked ? <FaBookmarkSolid className="text-yellow-500" /> : <FaBookmark />}
          </button>
        </div>
      </motion.div>
    );
  }

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-lg">{programme.name}</h4>
              {isRecentlyAdded() && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <FaUniversity className="text-gray-400" />
                {programme.university?.name}
              </span>
              {programme.level && (
                <span className="flex items-center gap-1">
                  <FaGraduationCap className="text-gray-400" />
                  {programme.level}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {programme.minAGP && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  Min AGP: {programme.minAGP}
                </span>
              )}
              {programme.helbEligible && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  HELB Eligible
                </span>
              )}
              {programme.scholarshipAvailable && (
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Scholarship
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => onToggleBookmark(programme.programmeID)}
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              {isBookmarked ? (
                <FaBookmarkSolid className="text-xl text-yellow-500" />
              ) : (
                <FaBookmark className="text-xl" />
              )}
            </button>
            <button 
              onClick={handleViewDetails}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
            {programme.name}
          </h4>
          <p className="text-gray-600 flex items-center gap-1">
            <FaUniversity className="text-sm" />
            {programme.university?.name}
          </p>
        </div>
        <button
          onClick={() => onToggleBookmark(programme.programmeID)}
          className="text-gray-300 hover:text-yellow-500 transition-colors group/bookmark"
        >
          {isBookmarked ? (
            <FaBookmarkSolid className="text-xl text-yellow-500" />
          ) : (
            <FaBookmark className="text-xl group-hover/bookmark:scale-110 transition-transform" />
          )}
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {programme.level && (
          <div className="flex items-center gap-2 text-sm">
            <FaGraduationCap className="text-gray-400" />
            <span>{programme.level}</span>
          </div>
        )}
        {programme.minAGP !== undefined && programme.minAGP !== null && (
          <div className="flex items-center gap-2 text-sm">
            <FaChartLine className="text-gray-400" />
            <span>Min AGP: <strong>{programme.minAGP}</strong></span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {programme.helbEligible && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            HELB
          </span>
        )}
        {programme.scholarshipAvailable && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            Scholarship
          </span>
        )}
        {programme.minAGP && programme.minAGP > 10 && (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            High Demand
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <button 
          onClick={handleViewDetails}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors"
        >
          <FaEye className="inline mr-2" />
          Details
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors">
          <FaShareAlt className="inline mr-2" />
          Share
        </button>
      </div>
    </motion.div>
  );
};

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedCluster, setSelectedCluster] = useState<string>("");
  const [expandedClusters, setExpandedClusters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("name-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState<number[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [minAGP, setMinAGP] = useState<number | "">("");
  const [maxAGP, setMaxAGP] = useState<number | "">("");
  const [showHelbOnly, setShowHelbOnly] = useState(false);
  const [showScholarshipOnly, setShowScholarshipOnly] = useState(false);

  // Get base data
  const { data: allProgrammes = [], isLoading, isError, refetch } = useGetAllProgrammesQuery();
  const { data: levels = [] } = useGetProgrammeLevelsQuery();
  const { data: clusters = [] } = useGetProgrammeClustersQuery();

  // ✅ FIXED: Only query with filters when they are actually selected
  const { data: filteredResults = [], isFetching: isFiltering } = useGetProgrammesWithFiltersQuery(
    {
      level: selectedLevel || undefined,
      clusterID: selectedCluster ? parseInt(selectedCluster) : undefined,
    },
    {
      // Skip query if no filters are selected
      skip: !selectedLevel && !selectedCluster,
    }
  );

  // Use filtered results when filters are active, otherwise use all programmes
  const baseProgrammes = useMemo(() => {
    // If we have active filters and filtered results are loading/loaded, use them
    if ((selectedLevel || selectedCluster) && filteredResults.length > 0) {
      return filteredResults;
    }
    // Otherwise, use all programmes
    return allProgrammes;
  }, [allProgrammes, filteredResults, selectedLevel, selectedCluster]);

  // Apply advanced filters
  const filteredByAdvanced = useMemo(() => {
    return baseProgrammes.filter((programme) => {
      // AGP range filter
      if (minAGP !== "" && programme.minAGP !== undefined && programme.minAGP < minAGP) return false;
      if (maxAGP !== "" && programme.minAGP !== undefined && programme.minAGP > maxAGP) return false;
      
      // HELB filter
      if (showHelbOnly && !programme.helbEligible) return false;
      
      // Scholarship filter
      if (showScholarshipOnly && !programme.scholarshipAvailable) return false;
      
      // Bookmark filter
      if (showBookmarkedOnly && !bookmarkedPrograms.includes(programme.programmeID)) return false;
      
      return true;
    });
  }, [baseProgrammes, minAGP, maxAGP, showHelbOnly, showScholarshipOnly, showBookmarkedOnly, bookmarkedPrograms]);

  // Apply search
  const searchedProgrammes = useMemo(() => {
    if (!searchQuery.trim()) return filteredByAdvanced;
    
    const query = searchQuery.toLowerCase().trim();
    return filteredByAdvanced.filter((p) =>
      p.name?.toLowerCase().includes(query) ||
      p.university?.name?.toLowerCase().includes(query) ||
      p.level?.toLowerCase().includes(query)
    );
  }, [filteredByAdvanced, searchQuery]);

  // Apply sorting
  const sortedProgrammes = useMemo(() => {
    return [...searchedProgrammes].sort((a, b) => {
      switch (sortBy) {
        case "name-asc": 
          return (a.name ?? "").localeCompare(b.name ?? "");
        case "name-desc": 
          return (b.name ?? "").localeCompare(a.name ?? "");
        case "university-asc": 
          return (a.university?.name ?? "").localeCompare(b.university?.name ?? "");
        case "university-desc": 
          return (b.university?.name ?? "").localeCompare(a.university?.name ?? "");
        case "minAGP-asc": 
          return (a.minAGP || 0) - (b.minAGP || 0);
        case "minAGP-desc": 
          return (b.minAGP || 0) - (a.minAGP || 0);
        default: 
          return 0;
      }
    });
  }, [searchedProgrammes, sortBy]);

  // Group by cluster for display
  const programmesByCluster = useMemo(() => {
    const groups: Record<string, { clusterName: string; count: number; programmes: TProgramme[] }> = {};
    
    // Initialize with all clusters
    clusters.forEach(cluster => {
      groups[cluster.clusterID.toString()] = {
        clusterName: cluster.name,
        count: 0,
        programmes: []
      };
    });
    
    // Add "All Programmes" group for uncategorized
    groups["all"] = {
      clusterName: "All Programmes",
      count: 0,
      programmes: []
    };
    
    // Distribute programmes to groups
    sortedProgrammes.forEach(programme => {
      if (programme.clusters && programme.clusters.length > 0) {
        // Add to each cluster the programme belongs to
        programme.clusters.forEach(cluster => {
          const clusterId = cluster.clusterID.toString();
          if (groups[clusterId]) {
            groups[clusterId].programmes.push(programme);
            groups[clusterId].count++;
          }
        });
      } else {
        // Add to "All Programmes" if no cluster
        groups["all"].programmes.push(programme);
        groups["all"].count++;
      }
    });
    
    // Convert to array and filter out empty groups
    return Object.entries(groups)
      .filter(([_, group]) => group.count > 0)
      .map(([clusterID, group]) => ({
        clusterID,
        ...group
      }));
  }, [sortedProgrammes, clusters]);

  const toggleCluster = (clusterID: string) => {
    setExpandedClusters((prev) =>
      prev.includes(clusterID) ? prev.filter((id) => id !== clusterID) : [...prev, clusterID]
    );
  };

  const resetFilters = () => {
    setSelectedLevel("");
    setSelectedCluster("");
    setSearchQuery("");
    setExpandedClusters([]);
    setMinAGP("");
    setMaxAGP("");
    setShowHelbOnly(false);
    setShowScholarshipOnly(false);
    setShowBookmarkedOnly(false);
    setShowAdvancedFilters(false);
  };

  const toggleBookmark = (programmeId: number) => {
    setBookmarkedPrograms((prev) =>
      prev.includes(programmeId) ? prev.filter((id) => id !== programmeId) : [...prev, programmeId]
    );
  };

  const expandAllClusters = () => setExpandedClusters(programmesByCluster.map(({ clusterID }) => clusterID));
  const collapseAllClusters = () => setExpandedClusters([]);

  const handleViewDetails = (programmeId: number) => {
    navigate(`/student/dashboard/programmes/${programmeId}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Debug logging to help identify issues
  useEffect(() => {
    console.log("Filter State:", {
      selectedLevel,
      selectedCluster,
      allProgrammesCount: allProgrammes.length,
      filteredResultsCount: filteredResults.length,
      baseProgrammesCount: baseProgrammes.length,
      isFiltering
    });
  }, [selectedLevel, selectedCluster, allProgrammes.length, filteredResults.length, baseProgrammes.length, isFiltering]);

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <FaGraduationCap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 text-xl" />
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading programmes...</p>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to load programmes</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">There was an error loading the programmes. Please check your connection and try again.</p>
      <button onClick={() => refetch()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
        <FaSearch className="text-sm" /> Retry Loading
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            University Programmes Explorer
          </h1>
          <p className="text-blue-100 opacity-90">
            Browse {allProgrammes.length} programmes from universities across Kenya
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programmes, universities, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3.5 rounded-xl flex items-center gap-2 font-medium transition-colors ${
                  showAdvancedFilters
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaFilter />
                Advanced Filters
              </button>
              <button
                onClick={expandAllClusters}
                className="px-4 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAllClusters}
                className="px-4 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Levels */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programme Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Levels</option>
                {levels.map((level) => (
                  <option key={level.levelID} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clusters */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Cluster
              </label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Clusters</option>
                {clusters.map((c) => (
                  <option key={c.clusterID} value={c.clusterID.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="university-asc">University (A-Z)</option>
                <option value="university-desc">University (Z-A)</option>
                <option value="minAGP-asc">Min AGP (Low to High)</option>
                <option value="minAGP-desc">Min AGP (High to Low)</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-end gap-2">
              <div className="flex bg-gray-100 rounded-xl p-1">
                {(["grid", "list", "compact"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                      viewMode === mode
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* AGP Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AGP Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minAGP}
                        onChange={(e) => setMinAGP(e.target.value ? Number(e.target.value) : "")}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="12"
                        step="0.1"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxAGP}
                        onChange={(e) => setMaxAGP(e.target.value ? Number(e.target.value) : "")}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="12"
                        step="0.1"
                      />
                    </div>
                  </div>

                  {/* Toggle Filters */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Quick Filters
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setShowHelbOnly(!showHelbOnly)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          showHelbOnly
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaHeartbeat />
                        HELB Only
                      </button>
                      <button
                        onClick={() => setShowScholarshipOnly(!showScholarshipOnly)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          showScholarshipOnly
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaStar />
                        Scholarship
                      </button>
                      <button
                        onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          showBookmarkedOnly
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaBookmark />
                        Bookmarked
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Summary */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-gray-600">
              <span className="font-semibold text-gray-800">{sortedProgrammes.length}</span> programmes found
              {selectedLevel && ` • Level: ${selectedLevel}`}
              {selectedCluster && ` • Cluster: ${clusters.find(c => c.clusterID.toString() === selectedCluster)?.name}`}
              {searchQuery && ` • Search: "${searchQuery}"`}
              {isFiltering && <span className="ml-2 text-blue-600">(Filtering...)</span>}
            </div>
            <div className="flex gap-2">
              {selectedLevel || selectedCluster || searchQuery || showAdvancedFilters ? (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <FaTimes />
                  Clear Filters
                </button>
              ) : null}
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                Refresh Results
              </button>
            </div>
          </div>
        </div>

        {/* Programmes Display */}
        <div className="space-y-6">
          {sortedProgrammes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center">
              <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No programmes found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            programmesByCluster.map(({ clusterID, clusterName, count, programmes }) => (
              <motion.div
                key={clusterID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Cluster Header */}
                <button
                  onClick={() => toggleCluster(clusterID)}
                  className="w-full flex justify-between items-center px-8 py-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FaGraduationCap className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">
                          {clusterName}
                        </h3>
                        <p className="text-gray-500">
                          {count} programme{count !== 1 ? "s" : ""}
                          {selectedLevel && ` • ${selectedLevel}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {expandedClusters.includes(clusterID) ? "Collapse" : "Expand"}
                    </span>
                    {expandedClusters.includes(clusterID) ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Programmes Grid */}
                {expandedClusters.includes(clusterID) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-8 pb-8"
                  >
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                          : viewMode === "list"
                          ? "mt-6 space-y-4"
                          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
                      }
                    >
                      {programmes.map((programme) => (
                        <ProgrammeCard
                          key={programme.programmeID}
                          programme={programme}
                          viewMode={viewMode}
                          isBookmarked={bookmarkedPrograms.includes(programme.programmeID)}
                          onToggleBookmark={toggleBookmark}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {allProgrammes.length}
              </div>
              <div className="text-gray-600">Total Programmes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {clusters.length}
              </div>
              <div className="text-gray-600">Subject Clusters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {allProgrammes.filter(p => p.helbEligible).length}
              </div>
              <div className="text-gray-600">HELB Eligible Programmes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;